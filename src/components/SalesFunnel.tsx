import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const steps = [
  {
    label: "Приветствие",
    description: "Улыбнись и поздоровайся в первые 30 секунд. Создай тёплую атмосферу.",
    color: "bg-stone-800",
    width: "w-[20%]",
  },
  {
    label: "Установление контакта",
    description: "Задай открытый вопрос: «Вы ищете что-то конкретное или просто смотрите?»",
    color: "bg-stone-700",
    width: "w-[35%]",
  },
  {
    label: "Выявление потребностей",
    description: "Узнай повод, предпочтения по стилю, размер и бюджет покупателя.",
    color: "bg-stone-600",
    width: "w-[50%]",
  },
  {
    label: "Презентация товара",
    description: "Покажи 2–3 варианта. Говори о выгодах: «Этот крой стройнит», «Ткань не мнётся».",
    color: "bg-stone-500",
    width: "w-[65%]",
  },
  {
    label: "Работа с возражениями",
    description: "Дорого? — «Давайте посмотрим похожий вариант». Не нравится цвет? — Предложи альтернативу.",
    color: "bg-stone-400",
    width: "w-[80%]",
  },
  {
    label: "Закрытие сделки",
    description: "Предложи примерить, добавь аксессуар. «Оформляем?» — скажи уверенно.",
    color: "bg-stone-300",
    width: "w-[100%]",
  },
];

function FunnelStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="flex flex-col items-center w-full"
    >
      <div className={`${step.width} flex items-center justify-center`}>
        <div
          className={`${step.color} w-full group relative cursor-default`}
          style={{
            clipPath: index === 0
              ? "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)"
              : index === steps.length - 1
              ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
              : "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <div className="py-5 px-4 text-center">
            <span
              className={`font-bold uppercase tracking-wide text-sm md:text-base ${
                index >= 4 ? "text-neutral-800" : "text-white"
              }`}
            >
              {step.label}
            </span>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-neutral-900 text-white text-sm rounded-none px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none shadow-xl">
            {step.description}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-900 rotate-45" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SalesFunnel() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h3 className="uppercase text-xs tracking-widest text-neutral-500 mb-3">Воронка продаж</h3>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 leading-tight">
            6 шагов к продаже
          </h2>
          <p className="mt-4 text-neutral-500 text-base max-w-xl mx-auto">
            Наведи на каждый уровень, чтобы узнать, что делать на этом этапе
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-1">
          {steps.map((step, i) => (
            <FunnelStep key={step.label} step={step} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-400 text-sm uppercase tracking-widest">
            Каждый шаг приближает к покупке
          </p>
        </motion.div>
      </div>
    </section>
  );
}
