import React, { useState } from 'react';

export default function App() {
  const [step, setStep] = useState(0);
  
  const steps = [
    { title: "孤立金属离子", desc: "5个 d 轨道能量相同（简并）" },
    { title: "配体靠近", desc: "水分子从6个方向包围金属离子" },
    { title: "轨道分裂", desc: "d 轨道分裂成 eg（高）和 t2g（低）两组" },
    { title: "光照与跃迁", desc: "电子吸收特定波长光，发生跃迁" },
  ];

  // 轨道名称
  const orbitals = ['dxy', 'dxz', 'dyz', 'dx²-y²', 'dz²'];
  const t2g = ['dxy', 'dxz', 'dyz'];
  const eg = ['dx²-y²', 'dz²'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
      <h1 className="text-2xl font-bold text-center mb-2">d 轨道分裂与颜色形成</h1>
      <p className="text-center text-slate-400 mb-6">以 Cu²⁺ 水溶液为例</p>
      
      {/* 步骤指示器 */}
      <div className="flex justify-center gap-2 mb-8">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`px-4 py-2 rounded-lg transition-all ${
              step === i 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>

      {/* 主要可视化区域 */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-center mb-2">{steps[step].title}</h2>
          <p className="text-center text-slate-400 mb-6">{steps[step].desc}</p>
          
          {/* 能级图 */}
          <svg viewBox="0 0 500 300" className="w-full max-w-2xl mx-auto">
            {/* 背景网格 */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="500" height="300" fill="url(#grid)" opacity="0.3"/>
            
            {/* 能量轴 */}
            <line x1="50" y1="30" x2="50" y2="270" stroke="#64748b" strokeWidth="2"/>
            <text x="30" y="150" fill="#94a3b8" fontSize="12" transform="rotate(-90, 30, 150)">能量 E</text>
            <polygon points="50,30 45,45 55,45" fill="#64748b"/>

            {step === 0 && (
              /* 步骤1: 简并轨道 */
              <g>
                <line x1="150" y1="150" x2="350" y2="150" stroke="#3b82f6" strokeWidth="3"/>
                {orbitals.map((name, i) => (
                  <g key={i}>
                    <circle cx={170 + i * 40} cy={150} r="8" fill="#3b82f6"/>
                    <text x={170 + i * 40} y={175} fill="#94a3b8" fontSize="10" textAnchor="middle">{name}</text>
                  </g>
                ))}
                <text x="250" y="200" fill="#e2e8f0" fontSize="14" textAnchor="middle">5个 d 轨道能量相同</text>
                
                {/* Cu²⁺ 电子排布：d⁹ */}
                <text x="250" y="230" fill="#fbbf24" fontSize="12" textAnchor="middle">Cu²⁺ 有 9 个 d 电子</text>
              </g>
            )}

            {step === 1 && (
              /* 步骤2: 配体靠近 */
              <g>
                {/* 中心金属离子 */}
                <circle cx="250" cy="150" r="25" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
                <text x="250" y="155" fill="white" fontSize="12" textAnchor="middle">Cu²⁺</text>
                
                {/* 6个水分子配体（八面体） */}
                {[
                  {x: 250, y: 60, label: "H₂O"},   // 上
                  {x: 250, y: 240, label: "H₂O"},  // 下
                  {x: 150, y: 150, label: "H₂O"},  // 左
                  {x: 350, y: 150, label: "H₂O"},  // 右
                  {x: 180, y: 90, label: "H₂O"},   // 左上
                  {x: 320, y: 210, label: "H₂O"},  // 右下
                ].map((pos, i) => (
                  <g key={i}>
                    <circle cx={pos.x} cy={pos.y} r="18" fill="#0ea5e9" opacity="0.8"/>
                    <text x={pos.x} y={pos.y + 4} fill="white" fontSize="10" textAnchor="middle">{pos.label}</text>
                    {/* 指向中心的虚线 */}
                    <line 
                      x1={pos.x} y1={pos.y} 
                      x2={250 + (pos.x - 250) * 0.4} y2={150 + (pos.y - 150) * 0.4}
                      stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4"
                    />
                  </g>
                ))}
                
                <text x="250" y="280" fill="#e2e8f0" fontSize="12" textAnchor="middle">
                  水分子的孤对电子指向金属离子（八面体配位）
                </text>
              </g>
            )}

            {step === 2 && (
              /* 步骤3: 轨道分裂 */
              <g>
                {/* eg 轨道（高能） */}
                <line x1="280" y1="80" x2="420" y2="80" stroke="#ef4444" strokeWidth="3"/>
                <text x="450" y="85" fill="#fca5a5" fontSize="12">eg</text>
                {eg.map((name, i) => (
                  <g key={i}>
                    <circle cx={320 + i * 60} cy={80} r="8" fill="#ef4444"/>
                    <text x={320 + i * 60} y={65} fill="#fca5a5" fontSize="10" textAnchor="middle">{name}</text>
                  </g>
                ))}
                <text x="350" y="50" fill="#fca5a5" fontSize="11" textAnchor="middle">↑ 指向配体，受排斥大</text>

                {/* t2g 轨道（低能） */}
                <line x1="280" y1="200" x2="420" y2="200" stroke="#22c55e" strokeWidth="3"/>
                <text x="450" y="205" fill="#86efac" fontSize="12">t₂g</text>
                {t2g.map((name, i) => (
                  <g key={i}>
                    <circle cx={310 + i * 50} cy={200} r="8" fill="#22c55e"/>
                    <text x={310 + i * 50} y={225} fill="#86efac" fontSize="10" textAnchor="middle">{name}</text>
                  </g>
                ))}
                <text x="350" y="250" fill="#86efac" fontSize="11" textAnchor="middle">↓ 指向配体间隙，受排斥小</text>

                {/* 分裂能 Δ */}
                <line x1="250" y1="80" x2="250" y2="200" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5"/>
                <text x="240" y="145" fill="#fbbf24" fontSize="16" textAnchor="end">Δ</text>
                <text x="130" y="140" fill="#fbbf24" fontSize="11" textAnchor="middle">分裂能</text>
                <text x="130" y="155" fill="#fbbf24" fontSize="10" textAnchor="middle">(决定吸收光的波长)</text>

                {/* 原始能级参考线 */}
                <line x1="80" y1="140" x2="180" y2="140" stroke="#64748b" strokeWidth="2" strokeDasharray="3"/>
                <text x="130" y="170" fill="#64748b" fontSize="10" textAnchor="middle">原简并能级</text>
              </g>
            )}

            {step === 3 && (
              /* 步骤4: 光吸收与跃迁 */
              <g>
                {/* eg 轨道 */}
                <line x1="280" y1="70" x2="420" y2="70" stroke="#ef4444" strokeWidth="3"/>
                <circle cx="320" cy="70" r="8" fill="#ef4444"/>
                <circle cx="380" cy="70" r="8" fill="#ef4444"/>
                <text x="450" y="75" fill="#fca5a5" fontSize="12">eg</text>

                {/* t2g 轨道 */}
                <line x1="280" y1="180" x2="420" y2="180" stroke="#22c55e" strokeWidth="3"/>
                <circle cx="310" cy="180" r="8" fill="#22c55e"/>
                <circle cx="360" cy="180" r="8" fill="#22c55e"/>
                <circle cx="410" cy="180" r="8" fill="#22c55e"/>
                <text x="450" y="185" fill="#86efac" fontSize="12">t₂g</text>

                {/* Cu²⁺ 的 9 个电子分布 */}
                {/* t2g: 6个电子 (3对) */}
                <text x="310" y="195" fill="white" fontSize="10" textAnchor="middle">↑↓</text>
                <text x="360" y="195" fill="white" fontSize="10" textAnchor="middle">↑↓</text>
                <text x="410" y="195" fill="white" fontSize="10" textAnchor="middle">↑↓</text>
                {/* eg: 3个电子 */}
                <text x="320" y="55" fill="white" fontSize="10" textAnchor="middle">↑↓</text>
                <text x="380" y="55" fill="white" fontSize="10" textAnchor="middle">↑</text>

                {/* 光子入射 */}
                <g>
                  {/* 红橙光波浪线 */}
                  <path d="M 80 125 Q 95 115 110 125 Q 125 135 140 125 Q 155 115 170 125" 
                        stroke="#f97316" strokeWidth="3" fill="none"/>
                  <polygon points="170,125 160,120 160,130" fill="#f97316"/>
                  <text x="125" y="105" fill="#fb923c" fontSize="11" textAnchor="middle">红橙光 (~600nm)</text>
                  <text x="125" y="145" fill="#fb923c" fontSize="10" textAnchor="middle">被吸收!</text>
                </g>

                {/* 电子跃迁箭头 */}
                <path d="M 380 170 C 400 140 400 100 380 80" 
                      stroke="#fbbf24" strokeWidth="2" fill="none" strokeDasharray="4"/>
                <polygon points="380,85 375,95 385,95" fill="#fbbf24"/>
                <text x="420" y="130" fill="#fbbf24" fontSize="11">电子跃迁!</text>

                {/* 分裂能标注 */}
                <line x1="250" y1="70" x2="250" y2="180" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3"/>
                <text x="245" y="130" fill="#fbbf24" fontSize="14" textAnchor="end">Δ</text>
              </g>
            )}
          </svg>
        </div>

        {/* Cu²⁺ 颜色解释卡片 */}
        {step === 3 && (
          <div className="mt-6 bg-gradient-to-r from-blue-900 to-cyan-900 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">为什么 Cu²⁺ 水溶液是蓝色？</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🔴🟠</div>
                <p className="text-orange-300 font-medium">吸收红橙光</p>
                <p className="text-sm text-slate-400">波长 ~600-700nm</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">➡️</div>
                <p className="text-slate-300">白光 − 红橙光</p>
                <p className="text-sm text-slate-400">= 互补色</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🔵</div>
                <p className="text-cyan-300 font-medium">呈现蓝色</p>
                <p className="text-sm text-slate-400">我们看到的颜色</p>
              </div>
            </div>

            {/* 色轮示意 */}
            <div className="mt-6 flex justify-center">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* 简化色轮 */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="url(#rainbow)" strokeWidth="15"/>
                  <defs>
                    <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444"/>
                      <stop offset="17%" stopColor="#f97316"/>
                      <stop offset="33%" stopColor="#eab308"/>
                      <stop offset="50%" stopColor="#22c55e"/>
                      <stop offset="67%" stopColor="#0ea5e9"/>
                      <stop offset="83%" stopColor="#3b82f6"/>
                      <stop offset="100%" stopColor="#8b5cf6"/>
                    </linearGradient>
                  </defs>
                  {/* 互补色连线 */}
                  <line x1="20" y1="35" x2="80" y2="65" stroke="white" strokeWidth="2" strokeDasharray="3"/>
                  <circle cx="20" cy="35" r="6" fill="#f97316" stroke="white" strokeWidth="2"/>
                  <circle cx="80" cy="65" r="6" fill="#0ea5e9" stroke="white" strokeWidth="2"/>
                </svg>
                <p className="text-center text-sm text-slate-400 mt-2">红橙 ↔ 蓝青 是互补色</p>
              </div>
            </div>
          </div>
        )}

        {/* 总结 */}
        <div className="mt-6 bg-slate-800 rounded-xl p-4">
          <h3 className="font-semibold mb-2">📝 总结</h3>
          <ol className="text-slate-300 space-y-1 text-sm">
            <li>1. 过渡金属有未填满的 d 轨道</li>
            <li>2. 配体（如 H₂O）靠近时，d 轨道因静电排斥而分裂成高低两组</li>
            <li>3. 分裂能 Δ 决定吸收光的波长：Δ = hν = hc/λ</li>
            <li>4. 吸收特定颜色的光后，反射出的互补色就是我们看到的颜色</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
