"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VisaAppealPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Draft Visa Appeal Letter</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Create a personalized visa rejection appeal letter with strong reasoning and proof of genuine intent.
        </p>
      </div>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Application Details</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Provide information about your visa application and rejection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="studentFullName" className="dark:text-white">
                Student's Full Name
              </Label>
              <Input
                id="studentFullName"
                placeholder="Enter your full name"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="countryApplication" className="dark:text-white">
                Country of Application
              </Label>
              <Select>
                <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="visaType" className="dark:text-white">
              Visa Type
            </Label>
            <Select>
              <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                <SelectValue placeholder="Select visa type" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                <SelectItem value="f1">F-1 Student Visa (USA)</SelectItem>
                <SelectItem value="tier4">Tier 4 Student Visa (UK)</SelectItem>
                <SelectItem value="study-permit">Study Permit (Canada)</SelectItem>
                <SelectItem value="student-500">Student Visa 500 (Australia)</SelectItem>
                <SelectItem value="student-visa">Student Visa (Germany)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rejectionReason" className="dark:text-white">
              Rejection Reason
            </Label>
            <Select>
              <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                <SelectValue placeholder="Select rejection reason" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                <SelectItem value="insufficient-funds">Insufficient Financial Evidence</SelectItem>
                <SelectItem value="ties-home-country">Weak Ties to Home Country</SelectItem>
                <SelectItem value="academic-credentials">Academic Credentials Issues</SelectItem>
                <SelectItem value="intent-to-return">Doubt About Intent to Return</SelectItem>
                <SelectItem value="documentation">Incomplete Documentation</SelectItem>
                <SelectItem value="interview-performance">Interview Performance</SelectItem>
                <SelectItem value="other">Other/Custom Reason</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clarificationMessage" className="dark:text-white">
              Clarification Message
            </Label>
            <Textarea
              id="clarificationMessage"
              placeholder="Explain how you plan to address the rejection reasons and provide additional evidence..."
              rows={4}
              className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Financial Sponsor Information</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Provide updated financial sponsor details to strengthen your appeal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="financialSponsorDetails" className="dark:text-white">
              Financial Sponsor Details
            </Label>
            <Textarea
              id="financialSponsorDetails"
              placeholder="Provide details about your financial sponsor, their relationship to you, income, and additional financial evidence..."
              rows={4}
              className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            size="lg"
          >
            {isGenerating ? "Generating Appeal Letter..." : "Generate Appeal Letter"}
          </Button>
        </CardContent>
      </Card>

      {showResult && (
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Generated Visa Appeal Letter</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Your personalized appeal letter is ready. Review and customize before submission.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Subject: Appeal for Visa Application Reconsideration</strong>
                <br />
                <br />
                Dear Visa Officer,
                <br />
                <br />I am writing to formally appeal the rejection of my [Visa Type] application for [Country]. I
                respectfully request that you reconsider my application based on the additional information and
                documentation provided below.
                <br />
                <br />
                <strong>Addressing the Rejection Concerns:</strong>
                <br />
                [The rejection was based on: Rejection Reason]. I understand your concerns and would like to provide the
                following clarification and additional evidence:
                <br />
                <br />
                [Clarification Message - personalized based on your input]
                <br />
                <br />
                <strong>Updated Financial Information:</strong>
                <br />
                [Financial Sponsor Details - enhanced evidence of financial support]
                <br />
                <br />
                <em>
                  [This is a sample template. The actual appeal letter would be fully personalized based on your
                  specific situation and inputs...]
                </em>
              </p>
            </div>
            <div className="mt-4 flex gap-4">
              <Button
                variant="outline"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
              >
                Edit Letter
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
