import React, { useId } from 'react';

const Input = ({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOption = [],
    selectCurrency = 'usd',
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) => {
    const amountInputId = useId();

    return (
        <div className={`glass-card p-4 rounded-2xl text-sm flex ${className} transition-all duration-300 hover:bg-white/10 group`}>
            <div className='w-1/2 flex flex-col'>
                <label htmlFor={amountInputId} className='text-cyan-300/80 mb-2 inline-block font-semibold tracking-wider uppercase text-xs'>
                    {label}
                </label>
                <input
                    id={amountInputId}
                    type="number"
                    className='outline-none w-full bg-transparent py-2 text-white font-bold text-2xl placeholder-white/20 font-[Orbitron] tracking-wide'
                    placeholder='0'
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className='w-1/2 flex flex-wrap justify-end text-right'>
                <p className='text-cyan-300/80 mb-2 w-full font-semibold tracking-wider uppercase text-xs'>Currency</p>
                <select
                    className='rounded-lg px-3 py-1 bg-black/40 text-white cursor-pointer outline-none border border-white/10 hover:border-cyan-500/50 transition-all duration-300 focus:ring-2 focus:ring-cyan-500/50 font-medium'
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOption.map((item) => (
                        <option key={item} value={item} className="bg-gray-900 text-white">
                            {item.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Input;