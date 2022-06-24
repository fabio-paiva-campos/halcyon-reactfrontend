import './styles/style.scss'
import { ContextWrap, useAppContext } from './hooks/context';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(useAppContext)
  console.log(data)

  const sampleData = [
    {id: 1, artista: "KL Jay"},
    {id: 2, artista: "Vintage Culture"},
    {id: 3, artista: "ANNA"},
    {id: 4, artista: "Gui Boratto"}
]

  return (
    <ContextWrap>
      <div className="playingDiv">
        <div className='tableArea'>
          <label className='pic'>pic</label>
          <div className='list'>
            <label className='label'>Tocando agora</label>
            <label className='labelSecondary'>DJ Marky</label>
            <label className='labelSecondary'>00:00/02:00</label>
            <span className='expand'>˅</span>
          </div>
        </div>
        <div className='listDiv'>
          <label className='listLabel'>Próximos:</label>
          {sampleData.map((d) => {return (
            <ul key={d.id} className='dataList'>
              <li className='listItem'>{d.artista}</li>
            </ul>
          )})}
        </div>
      </div>
    </ContextWrap>
  );
}

export default App;