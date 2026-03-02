import { useState } from 'react'
import { useEffect } from 'react'

import officeImg from './assets/office-bg.jpg'
import officeImg2 from './assets/off1.jpg'
import officeImg3 from './assets/off2.jpg'
import dect from './assets/dect.jpg'
import tut1 from './assets/1.png'
import tut2 from './assets/2.png'
import tut3 from './assets/3.png'
import win from './assets/win.png'
import item1 from './assets/item1.png'
import item2 from './assets/item2.png'
import item3 from './assets/item3.png'
import item4 from './assets/item4.png'
import item5 from './assets/item5.png'
import bgMusic from './assets/back2.mp3'
import clickSfx from './assets/click.mp3'
import correctSfx from './assets/good.mp3'
import wrongSfx from './assets/bad.mp3'
import endsfx from './assets/end.mp3'
import socs from './assets/socs.png'
import musicOnImg from './assets/musicon.jpg'
import musicOffImg from './assets/musicoff.png'
import elno from './assets/elno.gif'
import startsfx from './assets/start.mp3'
import rudop from './assets/rudop.gif'
import jump from './assets/jump2.mp3'
function App() {
  
  const [playerName, setPlayerName] = useState('')
  const [screen, setScreen] = useState('login')
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [answeredCount, setAnsweredCount] = useState(0)
const [numberAnswer, setNumberAnswer] = useState('')
const [feedback, setFeedback] = useState(null)
const [foundPins, setFoundPins] = useState([])
  const [score, setScore] = useState(0)
const [summary, setSummary] = useState(null)
const [level, setLevel] = useState(null)
const [selectedLevel, setSelectedLevel] = useState(null)
const [activePin, setActivePin] = useState(null)
const [timeLeft, setTimeLeft] = useState(15)
const [timerActive, setTimerActive] = useState(false)
const [music] = useState(() => new Audio(bgMusic))
const [musicOn, setMusicOn] = useState(false)
const [pinSound] = useState(() => new Audio(clickSfx))
const correctSound = new Audio(correctSfx)
const wrongSound = new Audio(wrongSfx)
const endSound = new Audio(endsfx)
const [usedQuestionIds, setUsedQuestionIds] = useState([]);
const startSound = new Audio(startsfx)
const jumpSound = new Audio(jump)
//////
const playPinSound = () => {
  pinSound.currentTime = 0
  pinSound.volume = 0.7
  pinSound.play()
}

//////
 const levels = [
   {
    id: '🟢 CASE 1 – Client A ',
    bg: officeImg,
    leveldesc: 'Laporan Keuangan \n income statement: \n - Revenue: Rp 2.500.000.000 \n - Expenses: Rp 1.600.000.000 \n - Net Income: Rp 900.000.000  \n balance sheet: \n  - Cash: Rp 400.000.000  \n - Inventory: Rp 600.000.000 \n - Fixed Assets: Rp 1.500.000.000  \n - Accounts Payable: Rp 700.000.000 \n ',
    pins: [
      { id: 1, top: '30%', left: '11%', img: item1 },
      { id: 2, top: '55%', left: '10%', img: item1 },
      { id: 3, top: '20%', left: '30%', img: item1 },
      { id: 4, top: '75%', left: '60%', img: item1 },
      { id: 5, top: '50%', left: '40%', img: item1 },
    ],
    questions: [
      {
        id: 1,
        type: 'number',
        q: '1. Revenue  \n Rincian Transaksi Penjualan: \n - Penjualan ke PT Alpha = Rp 1.000.000.000  \n - Penjualan ke PT Beta = Rp 800.000.000 \n - Penjualan ke PT Citra = Rp 200.000.000  \n - Penjualan ke PT Delta = Rp 500.000.000 \n = Total: "??" 00.000.000  \n berapa jumlah?',
        a: '25',
        desc: '"25" 00.000.000 .'
      },
      {
        id: 2,
        type: 'multiple',
        q: '2. Expenses \n Rincian Beban : \n - Beban gaji = Rp 1.000.000.000 \n - Beban listrik, air, telepon = Rp 300.000.000  \n - Beban transportasi & operasional = Rp 300.000.000 \n = Total: "??" 00.000.000  \n berapa jumlah?',
       options: ['16', '15','17','9'],
        a: '16',
        desc: '"16" 00.000.000 .'
      },
      {
        id: 3,
        type: 'boolean',
        q: '3. Aset Tetap \n Daftar Aset: \n - Mesin produksi = Rp 1.000.000.000 \n - Kendaraan operasional = Rp 500.000.000 \n = Total nilai buku: Rp 1.500.000.000 \n Apakah total aset tetap sudah sesuai dengan laporan keuangan?',
        a: 'Benar',
        desc: 'Hasil: ✅ Sesuai .'
      },
      {
        id: 4,
        type: 'boolean',
        q: '4. Inventory \n Hasil Stock Opname: \n - Bahan baku = Rp 350.000.000 \n - Barang dalam proses = Rp 150.000.000 \n - Barang jadi = Rp 100.000.000 \n = Total: Rp 600.000.000 \n Apakah total inventory sudah sesuai dengan laporan keuangan?',
        a: 'Benar',
        desc: 'Hasil: ✅ Sesuai .'
      },
      {
        id: 5,
        type: 'boolean',
        q: '5. Utang \n Rincian Utang Usaha : \n - Utang ke PT Supplier A = Rp 400.000.000 \n - Utang ke PT Supplier B = Rp 300.000.000 \n = Total: Rp 700.000.000 \n Apakah total utang sudah sesuai dengan laporan keuangan?',
        a: 'Benar',
        desc: 'Hasil: ✅ Sesuai .'
      }
    
    ]
  },

  {
    id: '🟡 CASE 2 – Client B ',
    bg: officeImg2,
    leveldesc: 'Income Statement: \n - Revenue: Rp 2.500.000.000 \n - Expenses: Rp 1.500.000.000  \n - Net Income: Rp 1.000.000.000 \n Balance Sheet: \n - Cash: Rp 400.000.000 \n - Inventory: Rp 800.000.000 \n - Fixed Assets: Rp 1.500.000.000 \n - Accounts Payable: Rp 700.000.000  ',
    pins: [
        { id: 1, top: '30%', left: '31%', img: item2 },
      { id: 2, top: '55%', left: '50%', img: item2},
      { id: 3, top: '20%', left: '20%', img: item2 },
      { id: 4, top: '75%', left: '70%', img: item2 },
      { id: 5, top: '60%', left: '60%', img: item2 },
    ],
    questions: [
      {
        id: 1,
        type: 'boolean',
        q: '1. Revenue  \n Rincian Transaksi Penjualan: \n - Penjualan ke PT Alpha = Rp 1.000.000.000  \n - Penjualan ke PT Beta = Rp 800.000.000 \n - Penjualan ke PT Citra = Rp 200.000.000  \n - Penjualan ke PT Delta = Rp 300.000.000 \n = Total: Rp 2.300.000.000  \n Apakah total revenue sudah sesuai dengan laporan keuangan?',
        a: 'Salah',
        desc: 'Hasil: ❌ Tidak Sesuai (Overstatement Rp 200.000.000) .'
      },
      {
        id: 2,
        type: 'boolean',
        q: '2. Expenses \n Rincian Beban : \n - Beban gaji = Rp 900.000.000 \n - Beban listrik, air, telepon = Rp 300.000.000  \n - Beban transportasi & operasional = Rp 300.000.000 \n = Total: Rp 1.500.000.000  \n Apakah total expenses sudah sesuai dengan laporan keuangan?',
        a: 'Benar',
        desc: 'Hasil: ✅ Sesuai .'
      },
      {
        id: 3,
        type: 'boolean',
        q: '3. Aset Tetap \n Daftar Aset: \n - Mesin produksi = Rp 1.000.000.000 \n - Kendaraan operasional = Rp 500.000.000 \n Apakah total aset tetap sudah sesuai dengan laporan keuangan?',
        a: 'Benar',
        desc: 'Hasil: ✅ Sesuai .'
      },
      {
        id: 4,
        type: 'boolean',
        q: '4. Inventory \n Hasil Stock Opname: \n - Bahan baku = Rp 350.000.000 \n - Barang dalam proses = Rp 150.000.000 \n - Barang jadi = Rp 100.000.000 \n = Total: Rp 600.000.000 \n Apakah total inventory sudah sesuai dengan laporan keuangan?',
        a: 'Salah',
        desc: 'Hasil: ❌ Tidak Sesuai (Understatement Rp 200.000.000) .'
      },
      {
        id: 5,
        type: 'boolean',
        q: '5. Utang \n Rincian Utang Usaha : \n - Utang ke PT Supplier A = Rp 400.000.000 \n - Utang ke PT Supplier B = Rp 300.000.000 \n = Total: Rp 700.000.000 \n Apakah total utang sudah sesuai dengan laporan keuangan?',
        a: 'Benar',
        desc: 'Hasil: ✅ Sesuai .'
      }
    ]
  },

  {
    id: '🔴 CASE 3 – Client C ',
    bg: officeImg3,
    leveldesc: 'Income Statement: \n - Revenue: Rp 2.500.000.000 \n - Expenses: Rp 1.400.000.000  \n - Net Income: Rp 1.100.000.000 \n Balance Sheet: \n - Cash: Rp 500.000.000 \n - Inventory: Rp 900.000.000 \n - Fixed Assets: Rp 1.500.000.000 \n - Accounts Payable: Rp 600.000.000  ',
    pins: [
         { id: 1, top: '11%', left: '31%', img: item5 },
      { id: 2, top: '15%', left: '50%', img: item5 },
      { id: 3, top: '30%', left: '20%', img: item5 },
      { id: 4, top: '65%', left: '70%', img: item5 },
      { id: 5, top: '40%', left: '50%', img: item5 },
    ],
    questions: [
      {
        id: 1,
        type: 'boolean',
        q: '1. Revenue  \n Rincian Transaksi Penjualan: \n - Penjualan ke PT Alpha = Rp 1.000.000.000  \n - Penjualan ke PT Beta = Rp 800.000.000 \n - Penjualan ke PT Citra = Rp 200.000.000  \n - Penjualan ke PT Delta = Rp 300.000.000 \n = Total: Rp 2.300.000.000  \n Apakah total revenue sudah sesuai dengan laporan keuangan?',
        a: 'Salah',
        desc: 'Hasil: ❌ Tidak Sesuai (Overstatement Rp 200.000.000) .'
      },
      {
        id: 2,
        type: 'boolean',
        q: '2. Expenses \n Rincian Beban : \n - Beban gaji = Rp 1.000.000.000 \n - Beban listrik, air, telepon = Rp 400.000.000  \n - Beban transportasi & operasional = Rp 300.000.000 \n = Total: Rp 1.700.000.000  \n Apakah total expenses sudah sesuai dengan laporan keuangan?',
        a: 'Salah',
        desc: 'Hasil: ❌ Tidak Sesuai (Understated di laporan) .'
      },
      {
        id: 3,
        type: 'boolean',
        q: '3. Aset Tetap \n Daftar Aset: \n - Mesin produksi = Rp 1.000.000.000 \n - Kendaraan operasional = Rp 500.000.000 \n Apakah total aset tetap sudah sesuai dengan laporan keuangan?',
        a: 'Benar',
        desc: 'Hasil: ✅ Sesuai .'
      },
      {
        id: 4,
        type: 'boolean',
        q: '4. Inventory \n Hasil Stock Opname: \n - Bahan baku = Rp 350.000.000 \n - Barang dalam proses = Rp 150.000.000 \n - Barang jadi = Rp 100.000.000 \n = Total: Rp 600.000.000 \n Apakah total inventory sudah sesuai dengan laporan keuangan?',
        a: 'Salah',
        desc: 'Hasil: ❌ Tidak Sesuai .'
      },
      {
        id: 5,
        type: 'boolean',
        q: '5. Utang \n Rincian Utang Usaha : \n - Utang ke PT Supplier A = Rp 500.000.000 \n - Utang ke PT Supplier B = Rp 400.000.000 \n = Total: Rp 900.000.000 \n Apakah total utang sudah sesuai dengan laporan keuangan?',
        a: 'Salah',
        desc: 'Hasil: ❌ Tidak Sesuai .'
      }
    ]
  }
]
const levelQuestions = {
  A: [
    {
        id: 1,
        type: 'multiple',
        q: 'Apa klasifikasi dokumen ini? \n a',
        options: ['Rahasia', 'Internal', 'Publik'],
        a: 'Rahasia',
        desc: 'Klasifikasi menentukan tingkat keamanan.'
      },
        {
        id: 2,
        type: 'number',
        q: 'Berapa jumlah stempel?',
        a: 3,
        desc: 'Jumlah stempel menunjukkan validasi.'
      },
      {
        id: 3,
        type: 'boolean',
        q: 'Apakah dokumen ini memiliki tanda tangan sah?',
        a: 'Benar',
        desc: 'Tanda tangan sah memastikan legitimasi dokumen.'
      },
      {
        id: 4,
        type: 'number',
        q: 'Berapa jumlah stempel?',
        a: 3,
        desc: 'Jumlah stempel menunjukkan validasi.'
      },
      {
        id: 5,
        type: 'boolean',
        q: 'Apakah dokumen ini memiliki tanda tangan sah?',
        a: 'Benar',
        desc: 'Tanda tangan sah memastikan legitimasi dokumen.'
      }
  ],

  B: [
    {
        id: 1,
        type: 'multiple',
        q: 'Apa klasifikasi dokumen ini?',
        options: ['Rahasia', 'Internal', 'Publik'],
        a: 'Rahasia',
        desc: 'Klasifikasi menentukan tingkat keamanan.'
      },
        {
        id: 2,
        type: 'number',
        q: 'Berapa jumlah stempel?',
        a: 3,
        desc: 'Jumlah stempel menunjukkan validasi.'
      },
      {
        id: 3,
        type: 'boolean',
        q: 'Apakah dokumen ini memiliki tanda tangan sah?',
        a: 'Benar',
        desc: 'Tanda tangan sah memastikan legitimasi dokumen.'
      },
      {
        id: 4,
        type: 'number',
        q: 'Berapa jumlah stempel?',
        a: 3,
        desc: 'Jumlah stempel menunjukkan validasi.'
      },
      {
        id: 5,
        type: 'boolean',
        q: 'Apakah dokumen ini memiliki tanda tangan sah?',
        a: 'Benar',
        desc: 'Tanda tangan sah memastikan legitimasi dokumen.'
      }
  ],

  C: [
     {
        id: 1,
        type: 'multiple',
        q: 'Apa klasifikasi dokumen ini?',
        options: ['Rahasia', 'Internal', 'Publik'],
        a: 'Rahasia',
        desc: 'Klasifikasi menentukan tingkat keamanan.'
      },
        {
        id: 2,
        type: 'number',
        q: 'Berapa jumlah stempel?',
        a: 3,
        desc: 'Jumlah stempel menunjukkan validasi.'
      },
      {
        id: 3,
        type: 'boolean',
        q: 'Apakah dokumen ini memiliki tanda tangan sah?',
        a: 'Benar',
        desc: 'Tanda tangan sah memastikan legitimasi dokumen.'
      },
      {
        id: 4,
        type: 'number',
        q: 'Berapa jumlah stempel?',
        a: 3,
        desc: 'Jumlah stempel menunjukkan validasi.'
      },
      {
        id: 5,
        type: 'boolean',
        q: 'Apakah dokumen ini memiliki tanda tangan sah?',
        a: 'Benar',
        desc: 'Tanda tangan sah memastikan legitimasi dokumen.'
      }
  ]
}
//////
const currentLevel = levels.find(l => l.id === level)
/////
const startLevel = (lvlId) => {
  setLevel(lvlId)
  setTimeLeft(15); setTimerActive(false);
  setSelectedLevel(lvlId)
  setFoundPins([])
  setUsedQuestionIds([]);
  setAnsweredCount(0)
  setScore(0)
  setCurrentQuestion(null)
  setScreen('play')
}

/////
const wow =()=>{
  if (answeredCount + 1 >= currentLevel.pins.length) {
  if (level < levels.length) {
    setLevel(prev => prev + 1)
    setAnsweredCount(0)
    setFoundPins([])      // RESET PIN
           setSummary(null)// Tutup summary
  } else {
    setScreen('result')
  }
}
}

const handlePointClick = () => {
  // Filter out questions that have already been answered
  const availableQuestions = currentLevel.questions.filter(
    q => !usedQuestionIds.includes(q.id)
  );

  if (availableQuestions.length > 0) {
    const randomIdx = Math.floor(Math.random() * availableQuestions.length);
    setCurrentQuestion(availableQuestions[randomIdx]);
  } else {
    console.log("Semua pertanyaan sudah terjawab!");
  }
};

const handlePinClick = (pinId) => {
 if (foundPins.includes(pinId) || currentQuestion || summary) return;
 playPinSound();
  setActivePin(pinId);
  setTimeLeft(15); // Reset to 15 seconds (or your preferred limit)
  setTimerActive(true);
  handlePointClick();
}

const handleAnswer = (userAnswer) => {
  if (!currentQuestion) return;
  setTimerActive(false)
  const isCorrect = String(userAnswer).toLowerCase() === String(currentQuestion.a).toLowerCase();
if (isCorrect) {
    correctSound.play();
    setScore(prev => prev + 1);
    setFeedback('✅ Jawaban benar!');
  } else {
    wrongSound.play();
    setFeedback('❌ Jawaban salah');
  }
 setSummary({
    question: currentQuestion.q,
    description: currentQuestion.desc,
    userAnswer,
    correctAnswer: currentQuestion.a,
    isCorrect
  })
  setUsedQuestionIds(prev => [...prev, currentQuestion.id]);
  setFoundPins(prev => [...prev, activePin])
setActivePin(null)

  setAnsweredCount(prev => prev + 1)
   setCurrentQuestion(null)
setNumberAnswer('')

 
 
}
///
const handleTimeUp = () => {
  wrongSound.play();
  setFeedback('⏰ Waktu Habis!');
  // Automatically treat as a wrong answer
  handleAnswer('TIMEOUT') // Passing empty string or any value that is not correct answer
};
////
useEffect(() => {
  music.loop = true
  music.volume = 0.4
  let interval;
  if (timerActive && timeLeft > 0) {
    interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
   } else if (timerActive && timeLeft === 0) {
    // Only call handleAnswer if the timer was actually active
    handleAnswer('TIMEOUT ⏰');
  }
  return () => clearInterval(interval);
}, [timerActive, timeLeft, music])

/////
  return (
   <div className="bgg">

  <div className="screens" >

      
      {/* SCREEN 1: LOGIN */}
      {screen === 'login' && (
        <div className="screens" >
          <h1>🧿 Game Audit: Criminal Case Mode</h1>
                        <img src={dect} alt="Detektif" className="dect-img" />
                        <h1></h1>
<img src={socs} alt="Socs" className="socs-img" />
          <p>Masukkan nama auditor untuk memulai investigasi:</p>
          <input 
            type="text" placeholder="Nama Auditor..." 
            value={playerName} onChange={(e) => setPlayerName(e.target.value)}
            className="inputName"
          />
          <br /><br />
          <button onClick={() => playerName.trim() ? (setScreen('tutorial'), startSound.play()) : alert("Isi nama dulu!")} className="actionBtnStyle" >Masuk ke Kantor</button>
    <h3></h3>
         {musicOn ?   <img src={rudop} alt="rudop" className='win-image'  /> : null}
       
  {/* MUSIC CONTROL */}
          <button
  onClick={() => {
    if (musicOn) {
      music.pause()
    } else {
      music.play()
    }
    setMusicOn(!musicOn)
  }}
  className='musicbtn'
>
{musicOn ? '🔊 Music On' :'🔇 Music Off' }
  {musicOn ? <img src={musicOnImg} alt="Music On" className="music-icon" /> : <img src={musicOffImg} alt="Music Off" className="music-icon" />}
</button>
   {/* MUSIC CONTROL */}
 <button
          
  onClick={() => {
   jumpSound.play()
  }}
  className='funnybtn'
>
funny
</button>
        </div>
        
      )}

      {/* SCREEN 2: TUTORIAL */}
      {screen === 'tutorial' && (
        <div className="screens" >
          <h1>Selamat Datang, Auditor '{playerName}' !</h1>
          <div className="tutorial">
             <h3>Tutorial:</h3>
             <p>Cari bukti-bukti audit di dalam ruangan dengan Barang. Jawab pertanyaan audit untuk mengumpulkan bukti.</p>
           <table>
  <tr style={{ borderBottom: '2px solid #555' }}>
    <td className="tut-img" ><img src={tut1} alt="Tutorial 1" className='tut-img2'  /></td>
    <td className="tut-img"><img src={tut2} alt="Tutorial 2" className='tut-img2'/></td>
    <td className="tut-img" ><img src={tut3} alt="Tutorial 3" className='tut-img2' /></td>
  </tr>
  <tr>
    <td className="tut-desc"  >1. Klik barang untuk menemukan bukti audit.</td>
    <td className="tut-desc"  >2. Jawab pertanyaan  dibawah dengan benar untuk mendapat poin.</td>
    <td className="tut-desc"  >3. klik tombol "lanjutkan audit" dibawah summary untuk lanjut.</td>
  </tr>
           </table>
{/* <p>!! WARNING = JAWAB PERTANYAAN SAAT INI SEBELUM CLICK BARANG BARU. JIKA TIDAK, AKAN ERROR DAN SOFTLOCK. UNTUK PERBAIKI RESET GAME!!</p> */}
          </div>
          <button onClick={() => setScreen('levelSelect')} className="actionBtnStyle">Mulai Audit</button>
          <h1></h1>
            {musicOn ?   <img src={rudop} alt="rudop" className='win-image'  /> : null}

             {/* MUSIC CONTROL */}
          <button
          
  onClick={() => {
   
      music.pause()
    
    setMusicOn(false)
  }}
  className='musicbtn'
>

turn off music
</button>
   {/* MUSIC CONTROL */}
 
        </div>
      )}
      {/* SCREEN 2.5: LEVEL SELECT */}
{screen === 'levelSelect' && (
  <div className="selects">
    <h1>Pilih Case</h1>
    
    {/* Horizontal Scroll Container */}
    <div className='scroll' style={{
      display: 'flex',
      flexDirection: 'row',
      overflowX: 'auto', // Enables horizontal scrolling
      padding: '20px',
      gap: '20px',
      WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
      scrollSnapType: 'x mandatory' // Snaps levels into place
    }}>
      {levels.map(lvl => (
        <div key={lvl.id}  style={{
          flex: '0 0 auto', // Prevents cards from shrinking
          width: '495px',
          border: '2px solid #7c7474',
          borderRadius: '15px',
          padding: '10px',
          backgroundColor: '#414141',
          scrollSnapAlign: 'center' // Works with scrollSnapType
        }}>
          <h3>Level {lvl.id}</h3>
          {/*<img 
            src={lvl.bg} 
            alt={`Preview ${lvl.id}`} 
            style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }} 
          /> Optional: Add a preview image for each level */}
          <button 
            onClick={() => startLevel(lvl.id)} 
            className="actionBtnStyle"
          >
            Main
          </button>
        </div>
      ))}
    </div>
    <h1></h1>
                   {musicOn ?   <img src={rudop} alt="rudop" className='win-image'  /> : null}

     {/* MUSIC CONTROL */}
          <button
  onClick={() => {
   
      music.pause()

    
    setMusicOn(false)
  }}
  className='musicbtn'
>

turn off music
</button>
   {/* MUSIC CONTROL */}
  </div>
)}


      {/* SCREEN 3: PLAY (AUDIT MODE) */}
      {screen === 'play' && (
        <div className="play-area">

  

<div className="titlebox" >
          <h3>Nama: {playerName}</h3>
          <h3>Level {level}</h3>
    
<h3>Bukti: {answeredCount}/{currentLevel.pins.length}</h3>
<h3>Score: {score}</h3>
</div>
    <div className='titlebox'>
  {currentLevel.leveldesc}
</div>
<div className="play-area-right" >

            
            <div className="img-container">
           <img src={currentLevel.bg} alt="BG" className="bg-img"  />
{currentLevel.pins.map(pin => {
  const isFound = foundPins.includes(pin.id)

  return (
    <div
      key={pin.id}
      style={{
        position: 'absolute',
        top: pin.top,
        left: pin.left
      }}
    >
      <img
        src={pin.img}
        onClick={() => handlePinClick(pin.id)}
        className='pinstyle'
      />

      {/* ✅ CHECKMARK OVERLAY */}
      {isFound && (
        <div className="checkmark-overlay" >
          ✅
        </div>
      )}
    </div>
  )
})}


            
            </div>

            {currentQuestion && (
              <div className="question-left">
                <div className="time-left">
      ⏱️ {timeLeft}s
    </div>
             <h3 className="laporanq" >📋 Laporan Temuan</h3>   
                <p className="question-text" >{currentQuestion.q}</p>
                
                <div className='divq1' >

  {/* MULTIPLE CHOICE */}
  {currentQuestion.type === 'multiple' && (
    currentQuestion.options.map(opt => (
      <button
        key={opt}
        onClick={() => handleAnswer(opt)}
        className="btnStyle"
      >
        {opt}
      </button>
    ))
  )}

  {/* BOOLEAN */}
  {currentQuestion.type === 'boolean' && (
    <>
      <button onClick={() => handleAnswer('Benar')} className="btnStyle">Benar / Ya</button>
      <button onClick={() => handleAnswer('Salah')} className="btnStyle">Salah / Tidak</button>
    </>
  )}

  {/* NUMBER INPUT */}
  {currentQuestion.type === 'number' && (
    <>
      <input
        type="number"
        value={numberAnswer}
        onChange={(e) => setNumberAnswer(Number(e.target.value))}
        placeholder="Masukkan angka..."
        className="inputName"
       
      />
{/* style={{
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}*/}
      <button
        onClick={() => handleAnswer(numberAnswer)}
        className="actionBtnStyle"
   
      >
             {/*style={{
          ...btnStyle,
          textAlign: 'center',
          backgroundColor: '#007bff',
          color: 'white'
        }}*/}
        Konfirmasi
      </button>
    </>
  )}

</div>
                <button onClick={() => setCurrentQuestion(null)} className='reject' >Batalkan</button>
              </div>
            )}
          </div>
{summary && (
  <div className="summary">
    <h3 style={{ marginTop: 0 }}>📝 Ringkasan Temuan</h3>

    <p><strong>Pertanyaan:</strong><br />{summary.question}</p>
<p className="summary-desc" style={{
    backgroundColor: summary.isCorrect ? '#e6fffa' : '#fff5f5',
  border: summary.isCorrect ? '1px solid #00bfa5' : '1px solid #ff4d4f',
  
}}>
  ℹ️ {summary.description}
</p>
    <p>
      <strong>Jawaban Kamu:</strong><br />
      {String(summary.userAnswer)}
    </p>

    <p>
      <strong>Jawaban Benar:</strong><br />
      {String(summary.correctAnswer)}
    </p>

    <p style={{
      fontWeight: 'bold',
      color: summary.isCorrect ? '#28a745' : '#dc3545'
    }}>
      {summary.isCorrect ? '✅ Valid' : '❌ Tidak valid'}
    </p>

    <button
      onClick={() => {

        setSummary(null);
                

      }}
      className="lanjut"
    >
      Lanjutkan Audit
    </button>
  </div>
)}
{answeredCount >= currentLevel.pins.length && (
  <button onClick={() => {
    endSound.play()
    setSummary(null);
    wow()
  }} className="finalBtnStyle">
    Next level!
  </button>
)}
          <br />
            {musicOn ?   <img src={rudop} alt="rudop" className='win-image'  /> : null}

   {/* MUSIC CONTROL */}
          <button
  onClick={() => {
   
      music.pause()
   
    
    setMusicOn(false)
  }}
  className='musicbtn'
>

turn off music
</button>
   {/* MUSIC CONTROL */}
        </div>
      )}

      {/* SCREEN 4: RESULT */}
      {screen === 'result' && (
        <div style={{ marginTop: '50px' }}>
          <h1>🏆 Audit Selesai!</h1>
          <img src={win} alt="win" className='win-image' />
          
           <h2>Nama: {playerName}</h2>
          <h2>Case {selectedLevel} Selesai!</h2>
<p>Score kamu: {score} / {currentLevel.pins.length}</p>
          <p style={{ fontSize: '20px' }}>Selamat Auditor <strong>{playerName}</strong>, kamu sudah berhasil mengidentifikasi semua celah keamanan di ruangan ini.</p>
          <button onClick={() => setScreen('levelSelect')} className="actionBtnStyle">
  Pilih Level Lagi
</button>
<div>
      ----
</div>
          <button onClick={() => window.location.reload()} className="actionBtnStyle">Ganti nama</button>
        <h1></h1>
                {musicOn ?   <img src={rudop} alt="rudop" className='win-image'  /> : null}

      {/* MUSIC CONTROL */}
          <button
  onClick={() => {
    if (musicOn) {
      music.pause()
    } else {
      music.play()
    }
    setMusicOn(!musicOn)
  }}
  className='musicbtn'
>
{musicOn ? '🔊 Music On' :'🔇 Music Off' }
  {musicOn ? <img src={musicOnImg} alt="Music On" className="music-icon" /> : <img src={musicOffImg} alt="Music Off" className="music-icon" />}
</button>
   {/* MUSIC CONTROL */}
        
          <button
          
  onClick={() => {
   jumpSound.play()
  }}
  className='funnybtn'
>
funny
</button>
 
        </div>
      )}
      </div>



    </div>
  )
}

// STYLING HELPERS
const btnStyle = {
  padding: '12px',
  textAlign: 'left',
  cursor: 'pointer',
  backgroundColor: '#f8f9fa',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '14px',
  color: '#333',
  transition: '0.3s'
};

const actionBtnStyle = {
  padding: '12px 25px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const finalBtnStyle = {
  padding: '15px 30px', 
  backgroundColor: '#28a745', 
  color: 'white', 
  border: 'none', 
  borderRadius: '8px', 
  cursor: 'pointer', 
  fontWeight: 'bold',
  fontSize: '18px'
};
const pinStyle = (top, left, disabled) => ({
  position: 'absolute',
  top,
  left,
  width: '35px',
  height: '35px',
  backgroundColor: 'rgba(255, 0, 0, 0.7)',
  borderRadius: '50%',
  border: '2px solid white',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',

  cursor: disabled ? 'default' : 'pointer',
  opacity: disabled ? 0.3 : 1,
  pointerEvents: disabled ? 'none' : 'auto'
})
///
export default App