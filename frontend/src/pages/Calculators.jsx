import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { DollarSign, PieChart, Calculator } from 'lucide-react';

const Calculators = () => {
    const [propertyPrice, setPropertyPrice] = useState(3300000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(10);
    const [interestRate, setInterestRate] = useState(3.5);
    const [loanTerm, setLoanTerm] = useState(30);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [showBreakdown, setShowBreakdown] = useState(false);

    // Calculate mortgage whenever inputs change
    useEffect(() => {
        calculateMortgage();
    }, [propertyPrice, downPaymentPercent, interestRate, loanTerm]);

    const calculateMortgage = () => {
        const price = parseFloat(propertyPrice) || 0;
        const downPayment = (price * parseFloat(downPaymentPercent)) / 100;
        const loanAmount = price - downPayment;

        const monthlyInterest = parseFloat(interestRate) / 100 / 12;
        const numberOfPayments = parseFloat(loanTerm) * 12;

        if (loanAmount <= 0 || monthlyInterest === 0) {
            setMonthlyPayment(0);
            return;
        }

        const x = Math.pow(1 + monthlyInterest, numberOfPayments);
        const monthly = (loanAmount * x * monthlyInterest) / (x - 1);

        if (isFinite(monthly)) {
            setMonthlyPayment(monthly.toFixed(0));
        } else {
            setMonthlyPayment(0);
        }
    };

    const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPaymentAmount;
    const totalPayment = monthlyPayment * loanTerm * 12;
    const totalInterest = totalPayment - loanAmount;

    return (
        <div className="pt-24 pb-16 min-h-screen bg-slate-50 px-3 sm:px-4">
            <SEO title="Mortgage Calculator" description="Calculate your estimated monthly mortgage payments." />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">Property Calculators</h1>
                    <p className="text-slate-600">Plan your finances with our easy-to-use mortgage tools.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    {/* Input Section */}
                    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <Calculator size={20} />
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-slate-800">Mortgage Calculator</h2>
                        </div>

                        <div className="space-y-5">
                            {/* Property Price */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Property Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">RM</span>
                                    <input
                                        type="number"
                                        value={propertyPrice}
                                        onChange={(e) => setPropertyPrice(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Down Payment */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Down Payment ({downPaymentPercent}%)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">RM</span>
                                        <input
                                            type="text"
                                            value={downPaymentAmount.toLocaleString()}
                                            readOnly
                                            className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-700"
                                        />
                                    </div>
                                </div>

                                {/* Interest Rate */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Interest Rate</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(e.target.value)}
                                            className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-slate-900"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Loan Tenure Slider */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Tenure (Years)</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="35"
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(e.target.value)}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-2">
                                    <span>10 Years</span>
                                    <span className="text-primary font-bold text-base">{loanTerm} Years</span>
                                    <span>35 Years</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="bg-gradient-to-br from-primary to-purple-700 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative z-10">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <DollarSign size={32} className="text-white" />
                                </div>
                                <p className="text-white/80 font-medium mb-2 text-sm">Monthly Repayment</p>
                                <div className="text-4xl sm:text-5xl font-bold tracking-tight">
                                    RM {monthlyPayment > 0 ? parseInt(monthlyPayment).toLocaleString() : '0'}
                                </div>
                            </div>

                            <button
                                onClick={() => setShowBreakdown(!showBreakdown)}
                                className="w-full text-center text-primary bg-white font-semibold py-2 px-4 rounded-lg hover:bg-white/90 transition-all text-sm"
                            >
                                {showBreakdown ? 'Hide' : 'View full breakdown'}
                            </button>

                            {showBreakdown && (
                                <div className="mt-6 pt-6 border-t border-white/20 space-y-3 animate-fade-in">
                                    <div className="flex justify-between">
                                        <span className="text-white/70 text-sm">Loan Amount</span>
                                        <span className="font-semibold">RM {loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/70 text-sm">Down Payment</span>
                                        <span className="font-semibold">RM {downPaymentAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/70 text-sm">Total Interest</span>
                                        <span className="font-semibold">RM {totalInterest > 0 ? totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-white/20">
                                        <span className="text-white/90 font-semibold">Total Cost</span>
                                        <span className="font-bold text-lg">RM {totalPayment > 0 ? totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculators;
