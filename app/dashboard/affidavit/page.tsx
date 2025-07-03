"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function AffidavitGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setShowResult(true)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Generate Affidavit of Support</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Create a legally formatted affidavit that declares financial sponsorship for study abroad.
        </p>
      </div>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Sponsor Information</CardTitle>
          <CardDescription className="dark:text-gray-300">Provide details about the financial sponsor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sponsorName" className="dark:text-white">
                Sponsor's Full Name
              </Label>
              <Input
                id="sponsorName"
                placeholder="Enter sponsor's full name"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationship" className="dark:text-white">
                Relationship to Student
              </Label>
              <Select>
                <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="guardian">Guardian</SelectItem>
                  <SelectItem value="relative">Relative</SelectItem>
                  <SelectItem value="sponsor">Sponsor</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation" className="dark:text-white">
              Sponsor's Occupation & Employer
            </Label>
            <Input
              id="occupation"
              placeholder="e.g., Software Engineer at ABC Company"
              className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="annualIncome" className="dark:text-white">
                Annual Income
              </Label>
              <Input
                id="annualIncome"
                type="number"
                placeholder="Enter annual income"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="countryResidence" className="dark:text-white">
                Country of Residence
              </Label>
              <Input
                id="countryResidence"
                placeholder="Enter country of residence"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sourceOfFunds" className="dark:text-white">
              Source of Funds
            </Label>
            <Textarea
              id="sourceOfFunds"
              placeholder="Describe the source of funds (e.g., salary, business income, savings, investments...)"
              rows={3}
              className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Student Information</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Provide details about the student being sponsored
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="studentName" className="dark:text-white">
                Student's Full Name
              </Label>
              <Input
                id="studentName"
                placeholder="Enter student's full name"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purposeAffidavit" className="dark:text-white">
                Purpose of Affidavit
              </Label>
              <Select>
                <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="us-visa">US Student Visa (F-1)</SelectItem>
                  <SelectItem value="uk-visa">UK Student Visa</SelectItem>
                  <SelectItem value="canada-visa">Canada Study Permit</SelectItem>
                  <SelectItem value="australia-visa">Australia Student Visa</SelectItem>
                  <SelectItem value="university">University Application</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="notaryStatement" className="dark:border-slate-600" />
            <Label htmlFor="notaryStatement" className="text-sm dark:text-gray-300">
              Add Notary Statement (recommended for legal documents)
            </Label>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            size="lg"
          >
            {isGenerating ? "Generating Affidavit..." : "Generate Affidavit"}
          </Button>
        </CardContent>
      </Card>

      {showResult && (
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Generated Affidavit of Support</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Your legally formatted affidavit is ready. Review and customize as needed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>AFFIDAVIT OF SUPPORT</strong>
                <br />
                <br />
                I, [Sponsor Name], hereby affirm under penalty of perjury that I am willing and able to provide
                financial support for [Student Name] during their studies abroad.
                <br />
                <br />
                <strong>Sponsor Details:</strong>
                <br />• Full Name: [Sponsor Name]
                <br />• Relationship to Student: [Relationship]
                <br />• Occupation: [Occupation & Employer]
                <br />• Annual Income: [Annual Income]
                <br />• Country of Residence: [Country]
                <br />
                <br />
                <strong>Financial Commitment:</strong>
                <br />I understand that this affidavit constitutes a commitment to provide financial support including
                tuition fees, living expenses, and other educational costs.
                <br />
                <br />
                <em>
                  [This is a sample generated content. The actual affidavit would be personalized based on your
                  inputs...]
                </em>
              </p>
            </div>
            <div className="mt-4 flex gap-4">
              <Button
                variant="outline"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
              >
                Edit Affidavit
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
