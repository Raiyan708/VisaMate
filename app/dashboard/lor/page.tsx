"use client"

import { useState } from "react"
import jsPDF from 'jspdf'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LORGeneratorPage() {
  const [recommenderName, setRecommenderName] = useState('')
  const [recommenderTitle, setRecommenderTitle] = useState('')
  const [relationship, setRelationship] = useState('')
  const [duration, setDuration] = useState('')
  const [context, setContext] = useState('')
  const [achievements, setAchievements] = useState('')
  const [program, setProgram] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [generatedLOR, setGeneratedLOR] = useState('')


  const handleGenerate = async () => {
  setIsGenerating(true)
  setShowResult(false)

  const userInputs = {
    name: "John Smith",
    title: "Professor of CS",
    duration: "2 years",
    context: "supervised me on ML research",
    qualities: "dedicated, sharp thinker",
    program: "MSc in Data Science",
  }

  const prompt = `Write a LOR from ${userInputs.name}, ${userInputs.title}, for a student known for ${userInputs.duration}. The student was known in the context of ${userInputs.context}. They are applying to ${userInputs.program}. Mention their ${userInputs.qualities}.`

  try {
    const response = await fetch("/api/ai/generate-lor", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    setGeneratedLOR(data.result || "AI response failed.")
    setShowResult(true)
  } catch (err) {
    setGeneratedLOR("⚠️ Failed to generate LOR.")
    setShowResult(true)
  }

  setIsGenerating(false)
}
const handleDownloadPDF = () => {
  const doc = new jsPDF()
  const lines = doc.splitTextToSize(generatedLOR, 180)
  doc.setFont('Times', 'Normal')
  doc.setFontSize(12)
  doc.text(lines, 15, 20)
  doc.save('Letter_of_Recommendation.pdf')
}

const handleEditPDF = () => {
  const newText = prompt("Edit the LOR content below:", generatedLOR)
  if (newText !== null) {
    setGeneratedLOR(newText)
  }
}


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">LOR Generator</h1>
        <p className="mt-2 text-gray-600">Generate professional Letters of Recommendation with personalized content.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommender Information</CardTitle>
          <CardDescription>Provide details about your recommender and your relationship</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="recommenderName">Recommender's Name</Label>
              <Input id="recommenderName" placeholder="Dr. John Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recommenderTitle">Title/Position</Label>
              <Input id="recommenderTitle" placeholder="Professor, Department of Computer Science" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relation">Relationship</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select your relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professor">Professor</SelectItem>
                <SelectItem value="supervisor">Research Supervisor</SelectItem>
                <SelectItem value="manager">Manager/Supervisor</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="colleague">Colleague</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration Known</Label>
            <Input id="duration" placeholder="e.g., 2 years" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">Context of Relationship</Label>
            <Textarea
              id="context"
              placeholder="Describe how you know the recommender and in what capacity..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievements">Key Achievements & Qualities</Label>
            <Textarea
              id="achievements"
              placeholder="List specific achievements, projects, or qualities the recommender can highlight..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">Target Program</Label>
            <Input id="program" placeholder="e.g., Master's in Data Science" />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isGenerating ? "Generating LOR..." : "Generate LOR"}
          </Button>
        </CardContent>
      </Card>

      {showResult && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Letter of Recommendation</CardTitle>
            <CardDescription>Your AI-generated LOR template is ready for your recommender.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap text-gray-700 leading-relaxed">
              {generatedLOR}
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button variant="outline" onClick={handleEditPDF}>
                ✏️ Edit LOR
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => navigator.clipboard.writeText(generatedLOR)}
              >
                📋 Copy
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleDownloadPDF}
              >
                📄 Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
