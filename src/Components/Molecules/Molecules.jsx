import { Table, InsertForm, EditForm, InsertBarangKeluar, Pencarian } from "../Atomics/Atomics"
import { useFetch } from "../../Config/useFetch"
import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "../../Config/firebase"


export const Navigasi = () => {
    return (
        <div className="navigasi">
            <Link to="/barangMasuk">Barang Masuk</Link>
            <Link to="/laporan">Stok Barang</Link>
            <Link to="/barangKeluar">Barang Keluar</Link>

        </div>
    )
}
export const SecondNav = () => {
    return (
        <div className="navigasi">
            <Link to="/barangMasukAtk">ATK</Link>
            <Link to="/barangMasukElektronik">Elektronik</Link>


        </div>
    )
}
export const BarangMasukAtk = () => {
    const { data: barangMasukAtk, loading: loadingMasukAtk } = useFetch('barangMasukAtk')



    const Thtd = ['Nama Barang', 'Merk', 'QTY', 'Waktu masuk', 'Pengirim', 'No Seri', 'Keterangan', 'Opsi', 'Tambah QTY barang']

    const Tbtd = ['namaBarang', 'merk', 'qty', 'time', 'pengirim', 'noSeri', 'keterangan']

    return (
        <div className="sectionBarangMasuk">


            <h1>Table Barang Masuk ATK</h1>
            {loadingMasukAtk &&
                <Table
                    data={barangMasukAtk}
                    table='barangMasukAtk'
                    table2='stokBarangAtk'
                    Thtd={Thtd}
                    Tbtd={Tbtd}
                    isQty={true}
                />}
            <InsertForm
                collPertama='barangMasukAtk'
                collKedua='stokBarangAtk' />

        </div>
    )
}

export const BarangMasukElektronik = () => {
    const { data: barangMasukElektronik, loading: loadingMasukElektronik } = useFetch('barangMasukElektronik')

    const Thtd = ['Nama Barang', 'Merk', 'QTY', 'Waktu masuk', 'Pengirim', 'No Seri', 'Keterangan', 'Opsi', 'Tambah QTY Barang']

    const Tbtd = ['namaBarang', 'merk', 'qty', 'time', 'pengirim', 'noSeri', 'keterangan']


    return (
        <div className="sectionBarangMasuk">
            <h1>Table Barang Masuk Elektronik</h1>
            {loadingMasukElektronik &&
                <Table
                    data={barangMasukElektronik}
                    table='barangMasukElektronik'
                    table2='stokBarangElektronik'
                    Thtd={Thtd}
                    Tbtd={Tbtd}
                isQty={true}
                />}
            <InsertForm
                collPertama='barangMasukElektronik'
                collKedua='stokBarangElektronik'
            />

        </div>
    )
}

export const LaporanBarangMasukAtk = () => {
    const { data: laporanBarangMasukAtk, loading: laporanLoadingMasukAtk } = useFetch('stokBarangAtk')
    const [isQuery, setQuery] = useState([])

    const Thtd = ['Nama Barang', 'Merk', 'QTY', 'Waktu masuk', 'Pengirim', 'No Seri', 'Keterangan']

    const Tbtd = ['namaBarang', 'merk', 'qty', 'time', 'pengirim', 'noSeri', 'keterangan']

  const input = useRef(null)
    useEffect(()=>{
        setQuery(laporanBarangMasukAtk)
    },[laporanBarangMasukAtk])

    const handleChange = e =>{
        if(input.current.value === ""){
            setQuery(laporanBarangMasukAtk)
        }else{     
            // setQuery(e.target.value)
            const result = laporanBarangMasukAtk.filter(item=>{
                if(item.namaBarang.toLowerCase() === e.target.value || item.noSeri.toLowerCase() === e.target.value || item.merk.toLowerCase() === e.target.value || item.pengirim.toLowerCase() === e.target.value){
                    return {...item}
                }
            })
            setQuery(result)
        }
    }
    laporanBarangMasukAtk.forEach(item => {
        if (item.qty <= 0) {
            const docRef = doc(db, 'stokBarangAtk', item.id)
            deleteDoc(docRef)
        }
    })

    return (
        <div className="sectionBarangMasuk">
            <h1>Table Laporan Stok Barang Atk</h1>
            <div className="pencarian">
                <input type="text" onChange={handleChange} ref={input}/>
                <button>Cari</button>
            </div>
            {laporanLoadingMasukAtk &&
                <Table
                    data={isQuery} table='stokBarangAtk'
                    // table2='stokBarangelektronik'
                    Thtd={Thtd}
                    Tbtd={Tbtd}
                />}

        </div>
    )
}

export const LaporanBarangMasukElektronik = () => {
    const { data: laporanBarangMasukElektronik, loading: laporanLoadingMasukElektronik } = useFetch('stokBarangElektronik')

    const [isQuery, setQuery] = useState([])

    const Thtd = ['Nama Barang', 'Merk', 'QTY', 'Waktu masuk', 'Pengirim', 'No Seri', 'Keterangan']
    const Tbtd = ['namaBarang', 'merk', 'qty', 'time', 'pengirim', 'noSeri', 'keterangan']

    const input = useRef(null)
    useEffect(()=>{
        setQuery(laporanBarangMasukElektronik)
    },[laporanBarangMasukElektronik])

    const handleChange = e =>{
        if(input.current.value === ""){
            setQuery(laporanBarangMasukElektronik)
        }else{     
            // setQuery(e.target.value)
            const result = laporanBarangMasukElektronik.filter(item=>{
                if(item.namaBarang === e.target.value || item.noSeri === e.target.value || item.merk === e.target.value || item.pengirim === e.target.value){
                    return {...item}
                }
            })
            setQuery(result)
        }
    }


    laporanBarangMasukElektronik.forEach(item => {
        if (item.qty <= 0) {
            const docRef = doc(db, 'stokBarangElektronik', item.id)
            getDoc(docRef)
                .then(res => {
                    const historyBarangKeluar = collection(db, 'historyBarangKeluar')
                    addDoc(historyBarangKeluar, {
                        ...res.data()
                    })
                    deleteDoc(docRef)

                })
        }
    })

    return (
        <div className="sectionBarangMasuk">
            <h1>Table Stok Barang Elektronik</h1>
            <div className="pencarian">
                <input type="text" onChange={handleChange} ref={input}/>
                <button>Cari</button>
            </div>
            {laporanLoadingMasukElektronik &&
                <Table
                    data={isQuery} table='stokBarangElekronik'
                    table2='stokBarangelektronik'
                    Thtd={Thtd}
                    Tbtd={Tbtd}
                tableHistory='historyBarangKeluar'
                />}

        </div>
    )
}

export const BarangKeluarAtk = () => {
    const { data: barangKeluarAtk } = useFetch('barangKeluarAtk')

    const { data: stokBarangAtk } = useFetch('stokBarangAtk')
    const [isInsert, setIsInsert] = useState(false)


    const Thtd = ['Nama Barang', 'Merk', 'QTY Keluar', 'Waktu masuk', 'Waktu Keluar', 'Pengirim', 'Instansi Penerima', 'No. Tanda Terima', 'No Seri', 'Keterangan', 'Pilih']

    const Tbtd = ['namaBarang', 'merk', 'qtyKeluar', 'time', 'timeOut', 'pengirim', 'instansiPenerima', 'tandaTerima', 'noSeri', 'keterangan']


    const handleInsert = () => {
        setIsInsert(!isInsert)
    }

    return (
        <div className="barangMasuk">
            <h1>Laporan Barang Keluar ATK</h1>
            <Table
                data={barangKeluarAtk}
                table='barangKeluarAtk'
                table2='stokBarangAtk'
                Tbtd={Tbtd}
                Thtd={Thtd}
            // tableHistory='historyBarangKeluar'
            />

            <button
                onClick={handleInsert}
            >
                Tambah</button>
            {isInsert ? <InsertBarangKeluar
                dataNamaBarang={stokBarangAtk}
                tableTambah1='barangKeluarAtk'
                tableStokBarang='stokBarangAtk'
            /> : null}
        </div>
    )
}



export const BarangKeluarElektronik = () => {
    const { data: barangKeluarElektronik } = useFetch('barangKeluarElektronik')

    const { data: stokElektronik } = useFetch('stokBarangElektronik')
    const [isInsert, setIsInsert] = useState(false)


    const Thtd = ['Nama Barang', 'Merk', 'QTY Keluar', 'Waktu masuk', 'Waktu Keluar', 'Pengirim', 'Instansi Penerima', 'No.Tanda Terima', 'No Seri', 'Keterangan', 'Pilih']

    const Tbtd = ['namaBarang', 'merk', 'qtyKeluar', 'time', 'timeOut', 'pengirim', 'instansiPenerima', 'tandaTerima', 'noSeri', 'keterangan']


    const handleInsert = () => {
        setIsInsert(!isInsert)
    }

    return (
        <div className="barangMasuk">
            <h1>Laporan Barang Keluar Elektronik</h1>

            <Table
                data={barangKeluarElektronik}
                table='barangKeluarElektronik'
                table2='stokBarangElektronik'
                Tbtd={Tbtd}
                Thtd={Thtd}
                tableHistory='historyBarangKeluar'
            />

            <button
                onClick={handleInsert}
            >
                Tambah</button>
            {isInsert ? <InsertBarangKeluar
                dataNamaBarang={stokElektronik}
                tableTambah1='barangKeluarElektronik'
                tableStokBarang='stokBarangElektronik'
            /> : null}
        </div>
    )
}

