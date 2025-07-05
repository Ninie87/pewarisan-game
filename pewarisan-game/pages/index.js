
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function getGametes(parent) {
  return [
    parent[0] + parent[2],
    parent[0] + parent[3],
    parent[1] + parent[2],
    parent[1] + parent[3],
  ];
}

function crossGametes(gametes1, gametes2) {
  const offspring = [];
  for (let g1 of gametes1) {
    for (let g2 of gametes2) {
      const a = [g1[0], g2[0]].sort().join("");
      const b = [g1[1], g2[1]].sort().join("");
      offspring.push(a + b);
    }
  }
  return offspring;
}

function getPhenotype(genotype) {
  const domA = genotype.includes("A");
  const domB = genotype.includes("B");
  return `${domA ? "Dominan" : "Resesif"} ${domB ? "Dominan" : "Resesif"}`;
}

function summarizePhenotypes(offspring) {
  const count = {};
  for (let g of offspring) {
    const pheno = getPhenotype(g);
    count[pheno] = (count[pheno] || 0) + 1;
  }
  return Object.entries(count).map(([name, value]) => ({ name, value }));
}

export default function Home() {
  const [parent1, setParent1] = useState("AaBb");
  const [parent2, setParent2] = useState("AaBb");
  const [offspring, setOffspring] = useState([]);
  const [summary, setSummary] = useState([]);

  const handleCross = () => {
    if (parent1.length !== 4 || parent2.length !== 4) return;
    const gametes1 = getGametes(parent1);
    const gametes2 = getGametes(parent2);
    const children = crossGametes(gametes1, gametes2);
    setOffspring(children);
    setSummary(summarizePhenotypes(children));
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Permainan Pewarisan Dihibrid</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>Genotip Induk 1: </label>
        <input value={parent1} onChange={e => setParent1(e.target.value)} maxLength={4} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Genotip Induk 2: </label>
        <input value={parent2} onChange={e => setParent2(e.target.value)} maxLength={4} />
      </div>
      <button onClick={handleCross} style={{ padding: '0.5rem 1rem', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '4px' }}>Hasilkan Anak</button>

      {offspring.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Senarai Genotip Anak</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {offspring.map((g, i) => (
              <div key={i} style={{ padding: '0.5rem', border: '1px solid #ccc', textAlign: 'center' }}>{g}</div>
            ))}
          </div>

          <h2 style={{ fontSize: '1.5rem', margin: '2rem 0 1rem' }}>Analisis Fenotip</h2>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </main>
  );
}
