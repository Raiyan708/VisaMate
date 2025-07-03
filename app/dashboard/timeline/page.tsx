"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, AlertCircle } from "lucide-react"

const timelineData = [
  {
    id: 1,
    title: "IELTS/TOEFL Preparation & Booking",
    description: "Book and prepare for English proficiency tests",
    monthsBefore: 12,
    status: "upcoming",
    icon: Clock,
  },
  {
    id: 2,
    title: "GRE/GMAT Preparation",
    description: "Prepare and take standardized tests",
    monthsBefore: 10,
    status: "upcoming",
    icon: Clock,
  },
  {
    id: 3,
    title: "University Research & Shortlisting",
    description: "Research and finalize target universities",
    monthsBefore: 9,
    status: "upcoming",
    icon: Clock,
  },
  {
    id: 4,
    title: "SOP & LOR Preparation",
    description: "Draft Statement of Purpose and request Letters of Recommendation",
    monthsBefore: 8,
    status: "upcoming",
    icon: Clock,
  },
  {
    id: 5,
    title: "Application Submission",
    description: "Submit applications to target universities",
    monthsBefore: 6,
    status: "critical",
    icon: AlertCircle,
  },
  {
    id: 6,
    title: "Financial Documentation",
    description: "Prepare bank statements and financial proof",
    monthsBefore: 5,
    status: "upcoming",
    icon: Clock,
  },
  {
    id: 7,
    title: "Admission Results",
    description: "Receive admission decisions from universities",
    monthsBefore: 3,
    status: "upcoming",
    icon: Clock,
  },
  {
    id: 8,
    title: "Visa Application",
    description: "Apply for student visa after receiving I-20/CAS",
    monthsBefore: 2,
    status: "critical",
    icon: AlertCircle,
  },
  {
    id: 9,
    title: "Pre-departure Preparation",
    description: "Book flights, arrange accommodation, pack essentials",
    monthsBefore: 1,
    status: "upcoming",
    icon: Clock,
  },
]

export default function TimelinePage() {
  const [intakeDate, setIntakeDate] = useState("")
  const [showTimeline, setShowTimeline] = useState(false)

  const handleGenerateTimeline = () => {
    setShowTimeline(true)
  }

  const calculateDate = (monthsBefore: number) => {
    if (!intakeDate) return ""
    const intake = new Date(intakeDate)
    const targetDate = new Date(intake.getFullYear(), intake.getMonth() - monthsBefore, intake.getDate())
    return targetDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Timeline Generator</h1>
        <p className="mt-2 text-gray-600">
          Create a personalized timeline with key milestones for your study abroad journey.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Your Timeline</CardTitle>
          <CardDescription>Enter your intended intake date to get a customized timeline</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="intakeDate">Intended Intake Start Date</Label>
            <Input id="intakeDate" type="date" value={intakeDate} onChange={(e) => setIntakeDate(e.target.value)} />
          </div>

          <Button
            onClick={handleGenerateTimeline}
            disabled={!intakeDate}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            Generate Timeline
          </Button>
        </CardContent>
      </Card>

      {showTimeline && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Your Study Abroad Timeline
            </CardTitle>
            <CardDescription>
              Key milestones leading up to your intake on{" "}
              {new Date(intakeDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {timelineData.map((item, index) => {
                const Icon = item.icon
                const targetDate = calculateDate(item.monthsBefore)

                return (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`p-2 rounded-full ${
                          item.status === "critical" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {index < timelineData.length - 1 && <div className="w-px h-12 bg-gray-200 mt-2" />}
                    </div>

                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            item.status === "critical" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {targetDate}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.monthsBefore} months before intake</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Start early - some processes take longer than expected</li>
                <li>• Keep track of deadlines for each university separately</li>
                <li>• Prepare financial documents well in advance</li>
                <li>• Book visa appointments as soon as you receive your I-20/CAS</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
