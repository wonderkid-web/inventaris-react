import '../../style/index.css'
import '../../style/sass/index.scss'
import { Navigasi } from '../Molecules/Molecules';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { BarangMasuk, Laporan, BarangKeluar } from '../Organism/Organism';

// TODO LIST
// menampilkan data 👍
// MEMBUAT TABLE BARANG MASUK 👍
// Sorting DATA TABLE 👍
// MEMISAHKAN TABLE MENJADI KOMPONEN ATOMIC 👍
// MENAMBAHKAN DATA 👍
// MENGHAPUS DATA 👍
// MODULARISASI COMPONENT KE MOLECULES 👍
// ABSTRAKSI COMPONENT TABLE 👍
// NAVIGASI ANTAR KOMPONEN BARANG MASUK 👍
// INSERT DATA SESUAI KATEGORI 👍
// MENGEDIT DATA 👍
// MENAMPILKAN DATA YANG DI EDIT PADA INPUT EDIT 👍
// HAPUS VALUE PADA INPUTAN JIKA DATA SUDAH TERKIRIM 👍
// JIKA DI STOK BARANG KOSONG, MAKA HAPUS DATA
// EDIT DATA PADA BARANG KELUAR



const App = () => {

    return (
        <div className="data">
            <Router>
                <Navigasi />
                <Routes>
                    <Route path='/barangMasuk' element={<BarangMasuk />} />
                    <Route path='/laporan' element={<Laporan />} />
                    <Route path='/barangKeluar' element={<BarangKeluar />} />
                    {/* <Route path='/barangKeluar' element={<BarangKeluar />} /> */}
                </Routes>
            </Router>
        </div>
    )
}

export default App