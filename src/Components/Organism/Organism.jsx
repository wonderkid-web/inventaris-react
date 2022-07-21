import { useState } from "react"
import { BarangMasukAtk, BarangMasukElektronik, LaporanBarangMasukAtk, LaporanBarangMasukElektronik, BarangKeluarAtk, BarangKeluarElektronik } from "../Molecules/Molecules"



export const BarangMasuk = () => {
    const [isAtk, setIsAtk] = useState(true)
    const [isElektronik, setIsElektronik] = useState(false)



    return (
        <div className="barangMasuk">

            <button onClick={() => {
                setIsAtk(true)
                setIsElektronik(false)
            }} >
                Barang Masuk Atk
            </button>
            <button onClick={() => {
                setIsElektronik(true)
                setIsAtk(false)
            }}
            >
                Barang Masuk Elektronik
            </button>

            {/* <BrowserRouter>
                <SecondNav />
                <Routes>
                    <Route path='/barangMasuk/barangMasukAtk' element={<BarangMasukAtk />} />
                    <Route path='/barangMasuk/barangMasukElektronik' element={<BarangMasukElektronik />} />
                </Routes>
            </BrowserRouter> */}

            {isAtk ? <BarangMasukAtk /> : null}

            {isElektronik ? <BarangMasukElektronik /> : null}

        </div >
    )
}

export const Laporan = () => {
    const [isAtk, setIsAtk] = useState(true)
    const [isElektronik, setIsElektronik] = useState(false)



    return (
        <div className="laporan">

            <button onClick={() => {
                setIsAtk(true)
                setIsElektronik(false)
            }} >
                Laporan Stok Barang Atk
            </button>
            <button onClick={() => {
                setIsElektronik(true)
                setIsAtk(false)
            }}
            >
                Laporan  Stok Barang Elektronik
            </button>

            {/* <BrowserRouter>
                <SecondNav />
                <Routes>
                    <Route path='/barangMasuk/barangMasukAtk' element={<BarangMasukAtk />} />
                    <Route path='/barangMasuk/barangMasukElektronik' element={<BarangMasukElektronik />} />
                </Routes>
            </BrowserRouter> */}

            {isAtk ? <LaporanBarangMasukAtk /> : null}

            {isElektronik ? <LaporanBarangMasukElektronik /> : null}



        </div >
    )
}

export const BarangKeluar = () => {
    const [isAtk, setIsAtk] = useState(true)
    const [isElektronik, setIsElektronik] = useState(false)

    return (
        <div className="barangKeluar">

            <button onClick={() => {
                setIsAtk(true)
                setIsElektronik(false)
            }} >
                Laporan Barang Keluar Atk
            </button>
            <button onClick={() => {
                setIsElektronik(true)
                setIsAtk(false)
            }}
            >
                Laporan Barang Keluar Elektronik
            </button>


            {isAtk ? <BarangKeluarAtk /> : null}

            {isElektronik ? <BarangKeluarElektronik /> : null}
        </div>
    )
}