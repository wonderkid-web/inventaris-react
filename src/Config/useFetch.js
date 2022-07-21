import { addDoc, collection, doc, getDoc, onSnapshot, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../Config/firebase";

export const useFetch = (field, setQ) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const colRef = collection(db, field)
    // const q = query(colRef, where('namaBarang', ))



    useEffect(() => {
        onSnapshot(colRef, snap => {
            setData(snap.docs.map(doc => (
                { ...doc.data(), id: doc.id }
            )))

        })
        setLoading(true)
    }, [])
    return { data, loading }
}



export const useSingleDoc = (coll, id) => {
    const [document, setDocument] = useState([])
    const getData = async () => {
        const docRef = doc(db, coll, id);
        const raw = await getDoc(docRef)
        setDocument({ ...raw.data(), id: raw.id })
    }
    useEffect(() => {
        getData()

    }, [])
    return { document, setDocument }
}

export const useAdd = (tablePertama, tableKedua) => {
    const [code, setCode] = useState(Math.floor(Math.random() * 500))
    const [barang, setBarang] = useState('')
    const [kategori, setKategori] = useState('')
    const [merk, setMerk] = useState('')
    const [qty, setQty] = useState('')
    const [time, setTime] = useState('')
    const [pengirim, setPengirim] = useState('')
    const [noSeri, setNoSeri] = useState('')
    const [keterangan, setKeterangan] = useState('')



    // Giving current time
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const handleSubmit = () => {
        setCode(Math.floor(Math.random() * 500))
        addDoc(tablePertama, {
            code,
            namaBarang: barang,
            kategori,
            merk,
            time: today,
            pengirim,
            qty,
            noSeri,
            keterangan,
        })
            .then(res => {
                setBarang('')
                setKategori('')
                setMerk('')
                setQty('')
                setPengirim('')
                setNoSeri('')
                setKeterangan('')

                // console.log('data berhasil di tambah');
            })
        // setCode(code + 1)
        addDoc(tableKedua, {
            code: code + 1,
            namaBarang: barang,
            kategori,
            merk,
            time: today,
            pengirim,
            qty,
            noSeri,
            keterangan,
        })
            .then(res => {
                setBarang('')
                setKategori('')
                setMerk('')
                setPengirim('')
                setNoSeri('')
                setKeterangan('')
                setQty('')
                // console.log(('data berhasil di tambah di stok barang '));
            })
    }
    return {
        barang, setBarang, merk, setMerk,
        kategori, setKategori, handleSubmit, time,
        pengirim, noSeri, keterangan, setQty,
        setTime, setPengirim, setNoSeri, setKeterangan, qty, code, setCode
    }
}