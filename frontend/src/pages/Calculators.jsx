import React, { useState } from 'react';
import SEO from '../components/SEO';
import { DollarSign, PieChart, Calculator } from 'lucide-react';

const Calculators = () => {
    const [loanAmount, setLoanAmount] = useState(500000);
    const [interestRate, setInterestRate] = useState(4.5);
    const [loanTerm, setLoanTerm] = useState(30);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const calculateMortgage = () => {
        const principal = parseFloat(loanAmount);
        const calculateInterest = parseFloat(interestRate) / 100 / 12;
        const calculatePayments = parseFloat(loanTerm) * 12;

        const x = Math.pow(1 + calculateInterest, calculatePayments);
        const monthly = (principal * x * calculateInterest) / (x - 1);

        if (isFinite(monthly)) {
            setMonthlyPayment(monthly.toFixed(2));
        } else {
            setMonthlyPayment(0);
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-slate-50 px-4">
            <SEO title="Mortgage Calculator" description="Calculate your estimated monthly mortgage payments." />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Property Calculators</h1>
                    <p className="text-slate-600">Plan your finances with our easy-to-use mortgage tools.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <Calculator size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Mortgage Calculator</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Amount (RM)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="number"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Interest Rate (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Term (Years)</label>
                                    <input
                                        type="number"
                                        value={loanTerm}
                                        onChange={(e) => setLoanTerm(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={calculateMortgage}
                                className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95"
                            >
                                Calculate Repayment
                            </button>
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative z-10 text-center">
                            <p className="text-slate-400 font-medium mb-2">Estimated Monthly Payment</p>
                            <div className="text-5xl font-bold mb-2 tracking-tight">
                                <span className="text-2xl align-top mr-1">RM</span>
                                {monthlyPayment > 0 ? monthlyPayment : '0.00'}
                            </div>
                            <p className="text-sm text-slate-400">Based on {interestRate}% interest per annum for {loanTerm} years.</p>

                            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Principal</p>
                                    <p className="font-semibold">RM {(parseInt(loanAmount) || 0).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Interest</p>
                                    <p className="font-semibold">RM {monthlyPayment > 0 ? ((monthlyPayment * loanTerm * 12) - loanAmount).toLocaleString(undefined, { maximumFractionDigits: 0 }) : 0}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Cost</p>
                                    <p className="font-semibold">RM {monthlyPayment > 0 ? (monthlyPayment * loanTerm * 12).toLocaleString(undefined, { maximumFractionDigits: 0 }) : 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculators;
