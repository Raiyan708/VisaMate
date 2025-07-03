"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FinancialStatementPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    tuitionCost: "",
    livingExpenses: "",
    miscellaneousCosts: "",
    sponsorName: "",
    totalFundsAvailable: "",
    currency: "USD",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setShowResult(true)
  }

  const calculateTotals = () => {
    const tuition = Number.parseFloat(formData.tuitionCost) || 0
    const living = Number.parseFloat(formData.livingExpenses) || 0
    const misc = Number.parseFloat(formData.miscellaneousCosts) || 0
    const totalRequired = tuition + living + misc
    const available = Number.parseFloat(formData.totalFundsAvailable) || 0
    const surplus = available - totalRequired

    return { tuition, living, misc, totalRequired, available, surplus }
  }

  const totals = calculateTotals()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Generate Financial Summary</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Automatically compile a breakdown of tuition fees, living costs, and sponsor support for visa or university
          submission.
        </p>
      </div>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Student Information</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Provide your personal details for the financial statement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="dark:text-white">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter your full name"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className="dark:text-white">
                Currency
              </Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Cost Breakdown</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Enter all expected costs for your study abroad program
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tuitionCost" className="dark:text-white">
                Tuition Cost (Annual)
              </Label>
              <Input
                id="tuitionCost"
                type="number"
                value={formData.tuitionCost}
                onChange={(e) => handleInputChange("tuitionCost", e.target.value)}
                placeholder="50000"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="livingExpenses" className="dark:text-white">
                Living Expenses (Annual)
              </Label>
              <Input
                id="livingExpenses"
                type="number"
                value={formData.livingExpenses}
                onChange={(e) => handleInputChange("livingExpenses", e.target.value)}
                placeholder="15000"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="miscellaneousCosts" className="dark:text-white">
              Miscellaneous Costs (Books, Travel, etc.)
            </Label>
            <Input
              id="miscellaneousCosts"
              type="number"
              value={formData.miscellaneousCosts}
              onChange={(e) => handleInputChange("miscellaneousCosts", e.target.value)}
              placeholder="5000"
              className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Financial Support</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Provide information about your financial sponsor and available funds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sponsorName" className="dark:text-white">
                Sponsor Name
              </Label>
              <Input
                id="sponsorName"
                value={formData.sponsorName}
                onChange={(e) => handleInputChange("sponsorName", e.target.value)}
                placeholder="Enter sponsor's name"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalFundsAvailable" className="dark:text-white">
                Total Funds Available
              </Label>
              <Input
                id="totalFundsAvailable"
                type="number"
                value={formData.totalFundsAvailable}
                onChange={(e) => handleInputChange("totalFundsAvailable", e.target.value)}
                placeholder="80000"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            size="lg"
          >
            {isGenerating ? "Generating Statement..." : "Generate Statement"}
          </Button>
        </CardContent>
      </Card>

      {/* Live Financial Summary Preview */}
      {(formData.tuitionCost || formData.livingExpenses || formData.totalFundsAvailable) && (
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Financial Summary Preview</CardTitle>
            <CardDescription className="dark:text-gray-300">Live calculation based on your inputs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formData.currency} {totals.tuition.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tuition Fees</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formData.currency} {totals.living.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Living Expenses</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formData.currency} {totals.totalRequired.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Required</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {formData.currency} {totals.available.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Funds Available</div>
              </div>
            </div>
            {totals.surplus !== 0 && (
              <div className="mt-4 text-center">
                <div
                  className={`text-lg font-semibold ${
                    totals.surplus >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {totals.surplus >= 0 ? "Surplus" : "Shortfall"}: {formData.currency}{" "}
                  {Math.abs(totals.surplus).toLocaleString()}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {showResult && (
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Generated Financial Statement Summary</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Your comprehensive financial statement is ready for submission.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>FINANCIAL STATEMENT SUMMARY</strong>
                <br />
                <br />
                <strong>Student Information:</strong>
                <br />
                Name: {formData.fullName || "[Student Name]"}
                <br />
                <br />
                <strong>Cost Breakdown:</strong>
                <br />• Annual Tuition Fees: {formData.currency} {totals.tuition.toLocaleString()}
                <br />• Annual Living Expenses: {formData.currency} {totals.living.toLocaleString()}
                <br />• Miscellaneous Costs: {formData.currency} {totals.misc.toLocaleString()}
                <br />•{" "}
                <strong>
                  Total Required: {formData.currency} {totals.totalRequired.toLocaleString()}
                </strong>
                <br />
                <br />
                <strong>Financial Support:</strong>
                <br />• Sponsor: {formData.sponsorName || "[Sponsor Name]"}
                <br />• Total Funds Available: {formData.currency} {totals.available.toLocaleString()}
                <br />• Financial Status:{" "}
                {totals.surplus >= 0
                  ? `Surplus of ${formData.currency} ${totals.surplus.toLocaleString()}`
                  : `Shortfall of ${formData.currency} ${Math.abs(totals.surplus).toLocaleString()}`}
                <br />
                <br />
                <em>
                  This financial statement demonstrates {totals.surplus >= 0 ? "adequate" : "insufficient"} funding for
                  the proposed study program.
                </em>
              </p>
            </div>
            <div className="mt-4 flex gap-4">
              <Button
                variant="outline"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
              >
                Edit Statement
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
