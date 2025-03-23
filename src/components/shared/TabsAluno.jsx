import { motion } from "framer-motion";

export default function TabsAluno({ tabs = [], abaAtiva, onChange }) {
  return (
    <nav className="flex justify-center gap-16 text-indigo-300 py-6 border-b border-gray-800 text-xl font-medium">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative pb-2 transition-all duration-300 ${
            abaAtiva === tab.id ? "text-white font-bold scale-105" : "hover:text-white"
          }`}
        >
          {tab.label}
          {abaAtiva === tab.id && (
            <motion.span
              layoutId="underline"
              className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-400 rounded"
            />
          )}
        </button>
      ))}
    </nav>
  );
}