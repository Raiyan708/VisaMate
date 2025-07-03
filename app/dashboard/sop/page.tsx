"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function SOPGeneratorPage() {
  const [fullName, setFullName] = useState("")
  const [course, setCourse] = useState("")
  const [university, setUniversity] = useState("")
  const [careerGoals, setCareerGoals] = useState("")
  const [academicBackground, setAcademicBackground] = useState("")
  const [projects, setProjects] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [output, setOutput] = useState("")

  const sopRef = useRef<HTMLDivElement>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setShowResult(false)

    const prompt = `
Generate a Statement of Purpose for the following student:

Full Name: ${fullName}
Course/Program: ${course}
Target University: ${university}
Career Goals: ${careerGoals}
Academic Background: ${academicBackground}
Projects & Experience: ${projects}
    `

    try {
  const aiRes = await fetch("http://localhost:5050/ai/sop", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const contentType = aiRes.headers.get("content-type");

  if (!aiRes.ok) {
    const errorText = await aiRes.text();
    throw new Error(`❌ Server Error: ${aiRes.status} - ${errorText}`);
  }

  if (contentType && contentType.includes("application/json")) {
    const { output: generatedSOP } = await aiRes.json();
    setOutput(generatedSOP);

    // Save the generated SOP
    const token = localStorage.getItem("token");
    const saveRes = await fetch("http://localhost:5050/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: "sop",
        prompt,
        output: generatedSOP,
        response: generatedSOP,
      }),
    });

    const saved = await saveRes.json();
    console.log("✅ SOP saved:", saved);
    setShowResult(true);
  } else {
    const text = await aiRes.text();
    throw new Error(`❌ Expected JSON, got:\n${text}`);
  }
} catch (error) {
  console.error("❌ Error generating/saving SOP:", error);
}

    setIsGenerating(false)
  }

  const handleDownload = async () => {
  try {
    if (typeof window !== "undefined" && sopRef.current) {
      const html2pdf = (await import("html2pdf.js")).default
      html2pdf().from(sopRef.current).save("Statement_of_Purpose.pdf")
    }
  } catch (error) {
    console.error("❌ PDF Download Failed:", error)
  }
}

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI-Powered SOP Generator</h1>
        <p className="mt-2 text-gray-600">
          Create a compelling Statement of Purpose tailored to your profile and target university.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Tell us about yourself to generate a personalized SOP</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course/Program</Label>
              <Input id="course" value={course} onChange={(e) => setCourse(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="university">Target University</Label>
            <Input id="university" value={university} onChange={(e) => setUniversity(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="careerGoals">Career Goals</Label>
            <Textarea
              id="careerGoals"
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="academicBackground">Academic Background</Label>
            <Textarea
              id="academicBackground"
              value={academicBackground}
              onChange={(e) => setAcademicBackground(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projects">Projects & Experience</Label>
            <Textarea
              id="projects"
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isGenerating ? "Generating SOP..." : "Generate SOP"}
          </Button>
        </CardContent>
      </Card>

      {showResult && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Statement of Purpose</CardTitle>
            <CardDescription>Your AI-generated SOP is ready. You can edit and customize it further.</CardDescription>
          </CardHeader>
          <CardContent>
            <div ref={sopRef} className="bg-gray-50 p-6 rounded-lg whitespace-pre-line text-gray-700 leading-relaxed">
              {output}
            </div>
            <div className="mt-4 flex gap-4">
              <Button variant="outline">Edit SOP</Button>
              <Button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-700">
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
