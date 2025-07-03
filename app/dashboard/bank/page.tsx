"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BankStatementPage() {
  const [showResult, setShowResult] = useState(false)
  const [tuitionCost, setTuitionCost] = useState("")
  const [livingCost, setLivingCost] = useState("")
  const [currency, setCurrency] = useState("USD")

  const handleCalculate = () => {
    setShowResult(true)
  }

  const totalRequired = (Number.parseFloat(tuitionCost) || 0) + (Number.parseFloat(livingCost) || 0)
  const recommendedAmount = totalRequired * 1.2 // 20% buffer

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bank Statement Generator</h1>
        <p className="mt-2 text-gray-600">Calculate required funds and generate sample financial documentation.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Requirements Calculator</CardTitle>
          <CardDescription>Enter your estimated costs to calculate total funding requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tuitionCost">Annual Tuition Cost</Label>
              <Input
                id="tuitionCost"
                type="number"
                placeholder="50000"
                value={tuitionCost}
                onChange={(e) => setTuitionCost(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="livingCost">Annual Living Expenses</Label>
              <Input
                id="livingCost"
                type="number"
                placeholder="15000"
                value={livingCost}
                onChange={(e) => setLivingCost(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleCalculate} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
            Calculate Required Funds
          </Button>
        </CardContent>
      </Card>

      {showResult && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Based on your inputs, here's your funding requirement breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {currency} {tuitionCost || "0"}
                  </div>
                  <div className="text-sm text-gray-600">Annual Tuition</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">
                    {currency} {livingCost || "0"}
                  </div>
                  <div className="text-sm text-gray-600">Living Expenses</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {currency} {recommendedAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Recommended Total</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sample Financial Letter Template</CardTitle>
              <CardDescription>Use this template for your financial documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {`To Whom It May Concern,

I, [Your Name], hereby confirm that I have sufficient financial resources to support my studies at [University Name] for the duration of my academic program.

Financial Summary:
• Annual Tuition Fees: ${currency} ${tuitionCost || "0"}
• Annual Living Expenses: ${currency} ${livingCost || "0"}
• Total Annual Requirement: ${currency} ${totalRequired.toLocaleString()}
• Recommended Total Funds: ${currency} ${recommendedAmount.toLocaleString()}

I have attached the following supporting documents:
• Bank statements for the last 6 months
• Fixed deposit certificates
• Income tax returns
• Sponsor's financial documents (if applicable)

I understand that these funds must be readily available and will be used solely for educational and living expenses during my studies.

Sincerely,
[Your Signature]
[Your Name]
[Date]`}
                </p>
              </div>
              <div className="mt-4 flex gap-4">
                <Button variant="outline">Edit Template</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Download PDF</Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
