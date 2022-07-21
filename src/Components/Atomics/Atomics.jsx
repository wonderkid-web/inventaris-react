import { async } from "@firebase/util"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { db } from "../../Config/firebase"
import { useAdd, useFetch, useSingleDoc } from "../../Config/useFetch"

// TODO LIST
// menampilkan data 👍
// MEMBUAT TABLE BARANG MASUK 👍
// Sorting DATA TABLE 👍
// MEMISAHKAN TABLE MENJADI KOMPONEN ATOMIC 👍
// MENAMBAHKAN DATA 👍
// MENGHAPUS DATA 👍
// MODULARISASI COMPONENT KE BENTUK MOLECULES 👍
// ABSTRAKSI COMPONENT TABLE 👍
// NAVIGASI ANTAR KOMPONEN BARANG MASUK 👍
// INSERT DATA SESUAI KATEGORI 👍
// MENGEDIT DATA 👍
// MENAMPILKAN DATA YANG DI EDIT PADA INPUT EDIT 👍
// HAPUS VALUE PADA INPUTAN JIKA DATA SUDAH TERKIRIM 👍
// JIKA DI STOK BARANG KOSONG, MAKA HAPUS DATA 👍 (ADA BUG, KARNA KETIKA DI BATALKAN KELUAR, BARANG TIDAK BISA BATAL KELUAR KARNA NO SERI PADA STOK BARANG SUDAH HILANG)
// EDIT DATA PADA BARANG KELUAR 


export const Table = ({ data, table, table2, Thtd, Tbtd, isQty }) => {
    const [isButton, setIsButton] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isPilih, setIsPilih] = useState(false)
    // const [isKurang, setIsKurang] = useState(false)
    const [plusQty, setPlusQty] = useState()

    const [isId, setIsId] = useState('')

    const inputQty = useRef(null)

    useEffect(() => {
        function checkOpsi(Array) {
            if (Array.includes('Opsi')) {
                setIsButton(true)
            } else if (Array.includes('Pilih')) {
                setIsPilih(true)
            }


        }

        checkOpsi(Thtd)

    }, [])

    const lastTd = (id, code) => {
        return (
            <td>
                <button onClick={e => {
                    e.preventDefault()
                    setIsEdit(!isEdit)
                    setIsId(id)

                }}>
                    Edit</button>
                <button onClick={e => {
                    e.preventDefault()

                    // delete bm
                    const idRef = doc(db, table, id)
                    deleteDoc(idRef)


                    getDocs(collection(db, table2))
                        .then(e => e.docs.forEach(dok => {
                            if (dok.data().code === code + 1) {
                                const sbId = dok.id;
                                const idRefSb = doc(db, table2, sbId)
                                deleteDoc(idRefSb)
                            }

                        }))

                    // console.log(`ID: ${d.id}`);
                    // console.log(`CODE: ${d.code}`)

                }}>
                    Hapus
                </button>
            </td>
        )
    }

    // TOMBOL TAMBAH QUANTITY
    const TambahQty = (id, code, currentQty) => {
        return (
            <td>
                <input type="text" placeholder="Tambah QTY?" ref={inputQty}
                    onChange={e => {
                        setPlusQty(parseInt(e.target.value))
                    }}
                />
                <button onClick={e => {
                    e.preventDefault()

                    // tambah qty bm
                    const idRef = doc(db, table, id)
                    updateDoc(idRef, {
                        qty: parseInt(currentQty) + plusQty
                    })
                        .then(() => {
                            inputQty.current.value = '';
                        })

                    // getDocs(collection(db, table2))
                    //     .then(item => {
                    //         item.docs.forEach(dok => {
                    //             if (dok.data().code === code + 1) {
                    //                 const dokRef = collection(db, table2, dok.id)
                    //                 updateDoc(dokRef, {
                    //                     qty: parseInt(currentQty) + plusQty
                    //                 })
                    //                     .then(() => {
                    //                         console.log('data berhasil di update pada table stok barang')
                    //                     })
                    //             }
                    //         })
                    //     })
                    getDocs(collection(db, table2))
                        .then(e => e.docs.forEach(dok => {
                            if (dok.data().code === code + 1) {
                                const sbId = dok.id;
                                const idRefSb = doc(db, table2, sbId)
                                updateDoc(idRefSb, {
                                    qty: parseInt(currentQty) + plusQty
                                })
                            }

                        }))

                    // console.log(`ID: ${d.id}`);
                    // console.log(`CODE: ${d.code}`)

                }}>
                    +
                </button>
            </td>
        )
    }

    // TOMBOL BATAL HAPUS PADA BARANG KELUAR
    const Pilih = (qtyKeluar, noSeri, id) => {

        const handlePilih = () => {
            const table1Ref = doc(db, table, id)
            const table2Ref = collection(db, table2)

            const getTable2 = async () => {
                const docs = await getDocs(table2Ref)
                const data = []
                docs.docs.map(doc => {
                    data.push(
                        { ...doc.data(), id: doc.id }
                    )
                })
                return data;
            }

            const getRawStokBarang = async () => {
                // TABLE BARANG ELEKTRONIK
                const raw = await getTable2()
                let totalBarang = raw.length
                let counter = 0
                raw.forEach(item => {
                    if (item.noSeri === noSeri) {
                        deleteDoc(table1Ref)
                        updateDoc(doc(db, table2, item.id), {
                            qty: parseInt(item.qty) + parseInt(qtyKeluar)
                        })
                    } else if (item.noSeri !== noSeri) {
                        counter++
                        if (totalBarang == counter) {
                            const docRef = doc(db, table, id)
                            getDoc(docRef)
                                .then(res => {
                                    addDoc(collection(db, table2), {
                                        namaBarang: res.data().namaBarang,
                                        code: res.data().code,
                                        merk: res.data().merk,
                                        qty: parseInt(res.data().qtyKeluar),
                                        time: res.data().time,
                                        pengirim: res.data().pengirim,
                                        noSeri: res.data().noSeri,
                                        keterangan: res.data().keterangan
                                    })
                                    deleteDoc(docRef)
                                })
                        }
                    }

                })
            }

            getRawStokBarang()
            // NAH INI BARU UDH GAK PROMISE

        }

        return (
            <td>
                <button
                    onClick={() => {

                        handlePilih()
                    }}
                >
                    Batal Keluar
                </button>
            </td>
        )
    }
    return (
        <div className="tableSection">
            <table className='table' >
                <thead>
                    <tr>
                        {Thtd.map(d => (
                            <td>{d}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(d => {
                        return (
                            <tr key={d.code}>
                                {
                                    Tbtd.map(td => (
                                        <td >{d[td]}</td>
                                    ))
                                }
                                {/* button */}

                                {isButton ? (lastTd(d.id, d.code)) : null}
                                {isPilih ? Pilih(d.qtyKeluar, d.noSeri, d.id) : null}
                                {isQty ? TambahQty(d.id, d.code, d.qty) : null}
                                {/* {isKurang ? Kurang(d.qty) : null} */}
                            </tr>
                        )

                    })}
                </tbody>
            </table >
            {isEdit ?
                (<EditForm
                    idTableYangDiEdit={isId}
                    TableYangDiEdit={table}
                    tableKeDua={table2} />)
                : null
            }

        </div>
    )

}

export const InsertForm = ({ collPertama, collKedua }) => {
    const refBarangMasuk = collection(db, collPertama)
    const refStokBarang = collection(db, collKedua)

    const { barang, setBarang, merk, setMerk, handleSubmit,
        qty, pengirim, noSeri, keterangan,
        setQty, setPengirim,
        setNoSeri, setKeterangan
    } = useAdd(refBarangMasuk, refStokBarang)

    return (
        <div className="insertForm">
            <form onSubmit={e => {
                e.preventDefault()
                handleSubmit()
            }}>
                <label htmlFor="namaBarang">Nama Barang</label>
                <input
                    required
                    value={barang}
                    onChange={e => { setBarang(e.target.value) }}
                    type="text"
                />

                <label htmlFor="supplier">Merk Barang</label>
                <input
                    required
                    value={merk}
                    onChange={e => { setMerk(e.target.value) }}
                    type="text"
                />

                <label htmlFor="namaBarang">QTY</label>
                <input
                    required
                    value={qty}
                    onChange={e => { setQty(e.target.value) }}
                    type="text"
                />

                <label htmlFor="supplier">Pengirim</label>
                <input
                    required
                    value={pengirim}
                    onChange={e => { setPengirim(e.target.value) }}
                    type="text"
                />
                <label htmlFor="spesifikasi">No. Seri</label>
                <input
                    required
                    value={noSeri}
                    onChange={e => { setNoSeri(e.target.value) }}
                    type="text"
                />
                <label htmlFor="supplier">Keterangan</label>
                <input
                    required
                    value={keterangan}
                    onChange={e => { setKeterangan(e.target.value) }}
                    type="text"
                />
                <button>Tambah Data</button>
            </form>
        </div>

    )
}

export const EditForm = ({ idTableYangDiEdit, TableYangDiEdit, tableKeDua }) => {

    const { document } = useSingleDoc(TableYangDiEdit, idTableYangDiEdit)

    const { data } = useFetch(tableKeDua)

    const [barang, setBarang] = useState('')
    const [merk, setMerk] = useState('')
    const [qty, setQty] = useState('')
    const [pengirim, setPengirim] = useState('')
    const [noSeri, setNoSeri] = useState('')
    const [keterangan, setKeterangan] = useState('')



    const form = useRef(null)
    const currentBarang = useRef(null)
    const currentMerk = useRef(null)
    const currentQty = useRef(null)
    const currentPengirim = useRef(null)
    const currentNoSeri = useRef(null)
    const currentKeterangan = useRef(null)



    const updateData = (barang, merk,
        pengirim, qty, noSeri, keterangan) => {
        const docRef = doc(db, TableYangDiEdit, idTableYangDiEdit)
        updateDoc(docRef, {
            namaBarang: barang,
            merk, 
            pengirim,
            qty,
            noSeri,
            keterangan
        })

        data.forEach(item => {
            if (item.code === document.code + 1) {
                const docRefStokBarang = doc(db, tableKeDua, item.id)
                updateDoc(docRefStokBarang, {
                    namaBarang: barang,
                    merk,
                    pengirim,
                    qty,
                    noSeri,
                    keterangan
                })
            }
        })
        form.current.style.display = 'none'

    }

    return (
        <div className="editForm" ref={form}>
            <label htmlFor="namaBarang">Nama Barang</label>
            <input
                required
                value={barang}
                onChange={e => { setBarang(e.target.value) }}
                type="text"
                ref={currentBarang}
            />


            <label htmlFor="supplier">Merk Barang</label>
            <input
                required
                value={merk}
                onChange={e => { setMerk(e.target.value) }}
                type="text"
                ref={currentMerk}
            />

            <label htmlFor="namaBarang">QTY</label>
            <input
                required
                value={qty}
                onChange={e => { setQty(e.target.value) }}
                type="text"
                ref={currentQty}

            />

            {/* <label htmlFor="namaBarang">Waktu Masuk</label>
            <input
                required
                value={time}
                onChange={e => { setTime(e.target.value) }}
                type="text"
                ref={currentTime}
            /> */}

            <label htmlFor="supplier">Pengirim</label>
            <input
                required
                value={pengirim}
                onChange={e => { setPengirim(e.target.value) }}
                type="text"
                ref={currentPengirim}
            />
            <label htmlFor="spesifikasi">No. Seri</label>
            <input
                required
                value={noSeri}
                onChange={e => { setNoSeri(e.target.value) }}
                type="text"
                ref={currentNoSeri}
            />
            <label htmlFor="supplier">Keterangan</label>
            <input
                required
                value={keterangan}
                onChange={e => { setKeterangan(e.target.value) }}
                type="text"
                ref={currentKeterangan}
            />
            <br></br>
            <button
                onClick={() => {
                    currentBarang.current.value = ''
                    currentMerk.current.value = ''
                    currentQty.current.value = ''
                    // currentTime.current.value = ''
                    currentPengirim.current.value = ''
                    currentNoSeri.current.value = ''
                    currentKeterangan.current.value = ''

                    updateData(barang, merk,
                        pengirim, qty, noSeri, keterangan)

                }}
            >Edit form</button>
        </div>
    )
}


export const InsertBarangKeluar = ({ dataNamaBarang, tableTambah1, tableStokBarang }) => {
    const [qty, setQty] = useState('')
    const [seri, setSeri] = useState('')
    const [totalQty, setTotalQty] = useState('')
    const [qtyKeluar, setQtyKeluar] = useState('')
    const [instansi, setInstansi] = useState('')
    const [tandaTerima, setTandaTerima] = useState('')
    // const [transaksi, setTransaksi] = useState('')
    // const [id, setId] = useState('')
    // let [key, setKey] = useState(1)

    // REF
    const select = useRef(null)
    const valQty = useRef(null)
    const penerima = useRef(null)
    const kodeTransaksi = useRef(null)
    const form = useRef(null)
    const tTrima = useRef(null)

    const handleTotalQty = () => {
        const val = valQty.current.value;
        setTotalQty(qty - val)
    }


    const handleAdd = () => {

        const tableBarangKeluar = collection(db, tableTambah1)

        // Giving current time
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;


        // JIKA INGIN MENGEDIT TABLE BARANG MASUK JUGA
        // let table1 = tableTambah1;
        // if (table1 === 'barangKeluarElektronik'){
        //     table1 = 'barangMasukElektronik'
        // } else if (table1 === 'barangMasukAtk'){
        //     table1 = 'barangMasukAtk'
        // }

        dataNamaBarang.forEach(item => {
            if (item.noSeri === seri) {
                const tableStok = doc(db, tableStokBarang, item.id)
                updateDoc(tableStok, {
                    qty: totalQty
                })
                addDoc(tableBarangKeluar, {
                    ...item,
                    newCode: item.code += Math.floor(Math.random() * 100),
                    timeOut: today,
                    instansiPenerima: instansi,
                    qtyKeluar,
                    tandaTerima
                })
                    .then(() => {
                        form.current.reset()
                        setQty(null)
                        setTotalQty(null)
                        setSeri(null)

                    })

            }
        })

    }

    return (
        <div className="formBarangKeluar">
            <form ref={form}>

                <label>Pilih Barang</label>
                <select onChange={(e) => {

                    dataNamaBarang.forEach(item => {
                        if (item.namaBarang === e.target.value) {
                            let random = parseInt(Math.floor(Math.random * 100))
                            // setTransaksi(kodeTransaksi.current.value)
                            setQty(item.qty)
                            setSeri(item.noSeri)
                            // setId(item.id)
                            setInstansi(penerima.current.value)
                            // setKey(random)
                            // console.log(transaksi)
                            // console.log('-----------')

                        }
                    })
                }} ref={select}>
                    <option value="">--PILIH NAMA BARANG--</option>
                    {
                        dataNamaBarang.map(item => {
                            return (
                                <option key={item.code}>
                                    {item.namaBarang}
                                </option>
                            )
                        })
                    }
                </select>
                <br />
                <label>KODE TRANSAKSI</label>
                <input type="text" value={seri} disabled ref={kodeTransaksi} />
                <br />

                <label>QTY Barang yang tersedia</label>
                <input type="number" value={qty} disabled />
                <br />

                <label>QTY yang ingin di keluarkan</label>
                <input
                    type="number"
                    min="1" max={qty}
                    onChange={e => {
                        setQtyKeluar(e.target.value)
                        handleTotalQty()
                    }}
                    ref={valQty}
                />
                <br />

                <label>Total QTY yang Tersedia</label>
                <input
                    type="number"
                    disabled
                    value={totalQty}

                />
                <br />

                <label>Instansi Penerima</label>
                <input type="text"
                    onChange={e => {
                        setInstansi(e.target.value)
                    }}
                    ref={penerima} />

                <label>Nomor Tanda Terima</label>
                <input type="text"
                    onChange={e => {
                        setTandaTerima(e.target.value)
                    }}
                    ref={tTrima} />

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        handleAdd()

                    }}
                >
                    Selesai
                </button>
            </form>

        </div>
    )
}
