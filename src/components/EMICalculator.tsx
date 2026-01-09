import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, IndianRupee, Percent, Calendar } from "lucide-react";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;

    if (monthlyRate === 0) {
      const emiValue = principal / months;
      setEmi(Math.round(emiValue));
      setTotalPayment(Math.round(principal));
      setTotalInterest(0);
      return;
    }

    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPaymentValue = emiValue * months;
    const totalInterestValue = totalPaymentValue - principal;

    setEmi(Math.round(emiValue));
    setTotalPayment(Math.round(totalPaymentValue));
    setTotalInterest(Math.round(totalInterestValue));
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} Lac`;
    }
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const principalPercentage = (loanAmount / totalPayment) * 100 || 0;
  const interestPercentage = (totalInterest / totalPayment) * 100 || 0;

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Calculator className="w-4 h-4" />
            EMI Calculator
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Calculate Your Home Loan EMI
          </h2>
          <p className="text-muted-foreground text-lg">
            Plan your finances better with our easy-to-use EMI calculator
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Input Section */}
          <Card className="border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Loan Amount */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    Loan Amount
                  </Label>
                  <span className="font-semibold text-primary">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  min={500000}
                  max={50000000}
                  step={100000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹5 Lac</span>
                  <span>₹5 Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-primary" />
                    Interest Rate (p.a.)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-20 text-center"
                      min={1}
                      max={20}
                      step={0.1}
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                  min={1}
                  max={20}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Loan Tenure
                  </Label>
                  <span className="font-semibold text-primary">
                    {loanTenure} Years
                  </span>
                </div>
                <Slider
                  value={[loanTenure]}
                  onValueChange={(value) => setLoanTenure(value[0])}
                  min={1}
                  max={30}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Result Section */}
          <Card className="border-border/50 shadow-soft bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="text-xl">EMI Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Monthly EMI */}
              <div className="text-center p-6 bg-card rounded-xl border border-border/50">
                <p className="text-muted-foreground mb-2">Monthly EMI</p>
                <p className="font-heading text-4xl font-bold text-primary">
                  {formatCurrency(emi)}
                </p>
              </div>

              {/* Visual Breakdown */}
              <div className="space-y-3">
                <div className="flex h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-primary transition-all duration-300"
                    style={{ width: `${principalPercentage}%` }}
                  />
                  <div
                    className="bg-accent transition-all duration-300"
                    style={{ width: `${interestPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span>Principal ({principalPercentage.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span>Interest ({interestPercentage.toFixed(1)}%)</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Principal Amount</span>
                  <span className="font-semibold">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Interest</span>
                  <span className="font-semibold text-accent">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total Payment</span>
                  <span className="font-bold text-primary">{formatCurrency(totalPayment)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EMICalculator;
