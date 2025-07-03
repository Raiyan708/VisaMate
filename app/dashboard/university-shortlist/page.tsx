"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "Sweden",
  "Ireland",
  "New Zealand",
]

export default function UniversityShortlistPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    academicScore: "",
    backlogs: "",
    degreeLevel: "",
    fieldOfStudy: "",
    budgetRange: "",
    scholarships: "",
  })

  const handleCountryToggle = (country: string) => {
    setSelectedCountries((prev) => (prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]))
  }

  const removeCountry = (country: string) => {
    setSelectedCountries((prev) => prev.filter((c) => c !== country))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setShowResult(true)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI-Powered University Shortlisting</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Discover your best-fit universities based on your profile, goals, and preferences.
        </p>
      </div>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Personal Information</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Tell us about yourself to get personalized university recommendations
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
              <Label htmlFor="email" className="dark:text-white">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="academicScore" className="dark:text-white">
                Academic Score (CGPA/Percentage)
              </Label>
              <Input
                id="academicScore"
                value={formData.academicScore}
                onChange={(e) => handleInputChange("academicScore", e.target.value)}
                placeholder="e.g., 8.5 CGPA or 85%"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backlogs" className="dark:text-white">
                Number of Backlogs (if any)
              </Label>
              <Input
                id="backlogs"
                type="number"
                value={formData.backlogs}
                onChange={(e) => handleInputChange("backlogs", e.target.value)}
                placeholder="0"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Academic Preferences</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Specify your study preferences and target programs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="degreeLevel" className="dark:text-white">
                Degree Level
              </Label>
              <Select value={formData.degreeLevel} onValueChange={(value) => handleInputChange("degreeLevel", value)}>
                <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <SelectValue placeholder="Select degree level" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="undergraduate">Undergraduate (UG)</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate (PG)</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fieldOfStudy" className="dark:text-white">
                Field of Study
              </Label>
              <Input
                id="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
                placeholder="e.g., Computer Science, Business, Engineering"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="dark:text-white">Preferred Countries</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {countries.map((country) => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox
                    id={country}
                    checked={selectedCountries.includes(country)}
                    onCheckedChange={() => handleCountryToggle(country)}
                    className="dark:border-slate-600"
                  />
                  <Label htmlFor={country} className="text-sm font-normal dark:text-gray-300 cursor-pointer">
                    {country}
                  </Label>
                </div>
              ))}
            </div>
            {selectedCountries.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedCountries.map((country) => (
                  <Badge key={country} variant="secondary" className="dark:bg-slate-700 dark:text-gray-300">
                    {country}
                    <button onClick={() => removeCountry(country)} className="ml-2 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Financial Preferences</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Help us understand your budget and funding preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="budgetRange" className="dark:text-white">
                Budget Range (Annual)
              </Label>
              <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange("budgetRange", value)}>
                <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="under-20k">Under $20,000</SelectItem>
                  <SelectItem value="20k-40k">$20,000 - $40,000</SelectItem>
                  <SelectItem value="40k-60k">$40,000 - $60,000</SelectItem>
                  <SelectItem value="60k-80k">$60,000 - $80,000</SelectItem>
                  <SelectItem value="above-80k">Above $80,000</SelectItem>
                  <SelectItem value="no-limit">No specific limit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scholarships" className="dark:text-white">
                Do you prefer scholarships?
              </Label>
              <Select value={formData.scholarships} onValueChange={(value) => handleInputChange("scholarships", value)}>
                <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="yes">Yes, prioritize scholarships</SelectItem>
                  <SelectItem value="no">No, self-funded</SelectItem>
                  <SelectItem value="maybe">Open to both options</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            size="lg"
          >
            {isGenerating ? "Shortlisting Your Universities..." : "Shortlist My Universities"}
          </Button>
        </CardContent>
      </Card>

      {showResult && (
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Your Personalized University Shortlist</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Based on your profile and preferences, here are your recommended universities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-lg">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI Analysis Complete!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We've analyzed your profile and found {Math.floor(Math.random() * 15) + 10} universities that match
                  your criteria.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                  {[
                    { name: "Stanford University", country: "USA", match: "95%" },
                    { name: "University of Toronto", country: "Canada", match: "92%" },
                    { name: "Imperial College London", country: "UK", match: "89%" },
                    { name: "University of Melbourne", country: "Australia", match: "87%" },
                    { name: "Technical University Munich", country: "Germany", match: "85%" },
                    { name: "University of Amsterdam", country: "Netherlands", match: "83%" },
                  ].map((uni, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-lg border dark:border-slate-600">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{uni.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{uni.country}</p>
                      <div className="mt-2">
                        <span className="text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full">
                          {uni.match} Match
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <Button
                variant="outline"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
              >
                Refine Search
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">
                Download Full Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
