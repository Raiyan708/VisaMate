"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Download } from "lucide-react"

const sampleChecklist = [
  { id: 1, item: "Valid Passport (minimum 6 months validity)", completed: false },
  { id: 2, item: "Visa Application Form (DS-160)", completed: false },
  { id: 3, item: "SEVIS I-901 Fee Receipt", completed: false },
  { id: 4, item: "Form I-20 from University", completed: false },
  { id: 5, item: "Financial Documents (Bank Statements)", completed: false },
  { id: 6, item: "Academic Transcripts", completed: false },
  { id: 7, item: "English Proficiency Test Scores (TOEFL/IELTS)", completed: false },
  { id: 8, item: "Standardized Test Scores (GRE/GMAT)", completed: false },
  { id: 9, item: "Passport-sized Photographs", completed: false },
  { id: 10, item: "Visa Interview Appointment", completed: false },
]

export default function VisaChecklistPage() {
  const [checklist, setChecklist] = useState(sampleChecklist)
  const [showChecklist, setShowChecklist] = useState(false)

  const handleGenerateChecklist = () => {
    setShowChecklist(true)
  }

  const toggleChecklistItem = (id: number) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const completedItems = checklist.filter((item) => item.completed).length
  const progressPercentage = (completedItems / checklist.length) * 100

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Visa Checklist Generator</h1>
        <p className="mt-2 text-gray-600">
          Get a personalized visa checklist based on your study destination and program.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Your Checklist</CardTitle>
          <CardDescription>Select your program details to get a customized visa checklist</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Program Level</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Destination Country</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Funding Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select funding" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self">Self-Funded</SelectItem>
                  <SelectItem value="sponsored">Sponsored</SelectItem>
                  <SelectItem value="scholarship">Scholarship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleGenerateChecklist} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
            Generate Visa Checklist
          </Button>
        </CardContent>
      </Card>

      {showChecklist && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Visa Checklist</span>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </CardTitle>
            <CardDescription>
              Track your progress: {completedItems} of {checklist.length} items completed (
              {Math.round(progressPercentage)}%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                  <Checkbox
                    id={`item-${item.id}`}
                    checked={item.completed}
                    onCheckedChange={() => toggleChecklistItem(item.id)}
                  />
                  <label
                    htmlFor={`item-${item.id}`}
                    className={`flex-1 text-sm cursor-pointer ${
                      item.completed ? "line-through text-gray-500" : "text-gray-900"
                    }`}
                  >
                    {item.item}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
