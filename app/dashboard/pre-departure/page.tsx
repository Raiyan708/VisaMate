"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Luggage,
  FileText,
  CreditCard,
  Shield,
  Home,
  Shirt,
  Zap,
  Download,
  Copy,
  Save,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react"
import { motion } from "framer-motion"

// Country data with climate and specific requirements
const countryData = {
  "United States": {
    climate: "varies",
    plugType: "Type A/B",
    voltage: "120V",
    currency: "USD",
    bannedMeds: ["Codeine-based medications", "Certain inhalers"],
    vaccinations: [],
    cashSuggestion: "$500-1000",
    simRecommendation: "T-Mobile, Verizon, AT&T prepaid",
    specialNotes: "TSA PreCheck recommended for frequent travel",
  },
  Canada: {
    climate: "cold",
    plugType: "Type A/B",
    voltage: "120V",
    currency: "CAD",
    bannedMeds: ["Certain prescription drugs without proper documentation"],
    vaccinations: [],
    cashSuggestion: "CAD $400-800",
    simRecommendation: "Rogers, Bell, Telus prepaid",
    specialNotes: "Bring thermal wear for winter months",
  },
  "United Kingdom": {
    climate: "temperate",
    plugType: "Type G",
    voltage: "230V",
    currency: "GBP",
    bannedMeds: ["Codeine without prescription", "Tramadol"],
    vaccinations: [],
    cashSuggestion: "£300-600",
    simRecommendation: "EE, O2, Three, Vodafone",
    specialNotes: "Always carry umbrella, weather changes frequently",
  },
  Australia: {
    climate: "varies",
    plugType: "Type I",
    voltage: "230V",
    currency: "AUD",
    bannedMeds: ["Codeine", "Pseudoephedrine"],
    vaccinations: ["Yellow Fever (if coming from infected areas)"],
    cashSuggestion: "AUD $500-1000",
    simRecommendation: "Telstra, Optus, Vodafone",
    specialNotes: "Strict biosecurity laws - declare all food items",
  },
  Germany: {
    climate: "temperate",
    plugType: "Type C/F",
    voltage: "230V",
    currency: "EUR",
    bannedMeds: ["Certain ADHD medications", "Strong painkillers"],
    vaccinations: [],
    cashSuggestion: "€400-700",
    simRecommendation: "Deutsche Telekom, Vodafone, O2",
    specialNotes: "Public transport is excellent, get a monthly pass",
  },
  France: {
    climate: "temperate",
    plugType: "Type C/E",
    voltage: "230V",
    currency: "EUR",
    bannedMeds: ["Codeine", "Certain antidepressants"],
    vaccinations: [],
    cashSuggestion: "€400-700",
    simRecommendation: "Orange, SFR, Bouygues",
    specialNotes: "Learn basic French phrases for better integration",
  },
  Netherlands: {
    climate: "temperate",
    plugType: "Type C/F",
    voltage: "230V",
    currency: "EUR",
    bannedMeds: ["Certain prescription drugs"],
    vaccinations: [],
    cashSuggestion: "€400-700",
    simRecommendation: "KPN, Vodafone, T-Mobile",
    specialNotes: "Cycling is primary transport - consider bike insurance",
  },
  Japan: {
    climate: "varies",
    plugType: "Type A/B",
    voltage: "100V",
    currency: "JPY",
    bannedMeds: ["Codeine", "Adderall", "Vyvanse", "Many cold medicines"],
    vaccinations: [],
    cashSuggestion: "¥30,000-50,000",
    simRecommendation: "SoftBank, NTT Docomo, au",
    specialNotes: "Cash-based society, many places don't accept cards",
  },
  Singapore: {
    climate: "tropical",
    plugType: "Type G",
    voltage: "230V",
    currency: "SGD",
    bannedMeds: ["Chewing gum", "E-cigarettes", "Certain medications"],
    vaccinations: [],
    cashSuggestion: "SGD $300-600",
    simRecommendation: "Singtel, StarHub, M1",
    specialNotes: "Strict laws - no chewing gum, heavy fines for littering",
  },
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const accommodationTypes = [
  "University dormitory",
  "Private rental apartment",
  "Shared accommodation",
  "Staying with relatives/friends",
  "Homestay",
  "Temporary hotel/hostel",
]

// Climate-based clothing suggestions
const getClothingSuggestions = (country: string, month: string) => {
  const countryInfo = countryData[country as keyof typeof countryData]
  const monthIndex = months.indexOf(month)

  const suggestions = []

  if (country === "Canada" && (monthIndex >= 10 || monthIndex <= 2)) {
    suggestions.push("Heavy winter coat", "Thermal underwear", "Warm boots", "Gloves and scarf", "Wool socks")
  } else if (country === "United Kingdom") {
    suggestions.push("Waterproof jacket", "Umbrella", "Layered clothing", "Comfortable walking shoes")
  } else if (country === "Australia" && (monthIndex >= 11 || monthIndex <= 2)) {
    suggestions.push("Light cotton clothes", "Sunhat", "Sunglasses", "Swimwear", "Light jacket for AC")
  } else if (country === "Singapore") {
    suggestions.push("Light, breathable fabrics", "Umbrella for rain", "Comfortable sandals", "Light sweater for AC")
  } else if (country === "Japan" && (monthIndex >= 11 || monthIndex <= 2)) {
    suggestions.push("Warm winter coat", "Layers for heating", "Comfortable shoes", "Umbrella")
  } else {
    suggestions.push(
      "Versatile clothing for layering",
      "Comfortable walking shoes",
      "Light jacket",
      "Formal outfit for occasions",
    )
  }

  return suggestions
}

export default function PreDepartureChecklistPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showChecklist, setShowChecklist] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState({
    country: "",
    month: "",
    accommodation: "",
    specialRequirements: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setShowChecklist(true)
  }

  const toggleChecklistItem = (itemId: string) => {
    setCheckedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }))
  }

  const getCompletionPercentage = () => {
    const totalItems = Object.keys(checkedItems).length
    const completedItems = Object.values(checkedItems).filter(Boolean).length
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
  }

  const countryInfo = formData.country ? countryData[formData.country as keyof typeof countryData] : null
  const clothingSuggestions =
    formData.country && formData.month ? getClothingSuggestions(formData.country, formData.month) : []

  const checklistSections = [
    {
      id: "travel",
      title: "Travel Essentials",
      icon: Luggage,
      color: "text-blue-600 dark:text-blue-400",
      items: [
        "Valid passport (minimum 6 months validity)",
        "Student visa and supporting documents",
        "Flight tickets (print if required by airline)",
        "Travel insurance documents",
        "Emergency contact information",
        "Copies of all important documents (digital + physical)",
      ],
    },
    {
      id: "academic",
      title: "Academic Documents",
      icon: FileText,
      color: "text-emerald-600 dark:text-emerald-400",
      items: [
        "University offer letter",
        "Acceptance confirmation email",
        formData.country === "United States"
          ? "I-20 form"
          : formData.country === "United Kingdom"
            ? "CAS letter"
            : "Student visa documents",
        "Academic transcripts (original + certified copies)",
        "English proficiency test scores (IELTS/TOEFL)",
        "Standardized test scores (GRE/GMAT if applicable)",
        "Student ID card (if already issued)",
      ],
    },
    {
      id: "financial",
      title: "Financial Documents",
      icon: CreditCard,
      color: "text-purple-600 dark:text-purple-400",
      items: [
        "Forex card with sufficient balance",
        `Local currency cash (${countryInfo?.cashSuggestion || "$500-1000"})`,
        "Bank statements and financial proof",
        "Tuition fee payment receipt",
        "Scholarship documents (if applicable)",
        "International debit/credit cards",
        "Emergency fund access details",
      ],
    },
    {
      id: "health",
      title: "Health & Insurance",
      icon: Shield,
      color: "text-red-600 dark:text-red-400",
      items: [
        "Travel health insurance policy",
        "Prescription medications (with doctor's note)",
        "Medical records and vaccination certificates",
        ...(countryInfo?.vaccinations.length ? [`Required vaccinations: ${countryInfo.vaccinations.join(", ")}`] : []),
        "First aid kit basics",
        "Health insurance card (if applicable)",
      ],
    },
    {
      id: "accommodation",
      title: "Accommodation Documents",
      icon: Home,
      color: "text-orange-600 dark:text-orange-400",
      items: [
        formData.accommodation === "University dormitory" ? "Dormitory allocation letter" : "Tenancy agreement/lease",
        "Proof of accommodation booking",
        "Host/landlord contact information",
        "Check-in instructions and procedures",
        "Emergency contact for accommodation",
        "Deposit payment confirmation",
      ],
    },
    {
      id: "packing",
      title: "Clothing & Personal Items",
      icon: Shirt,
      color: "text-indigo-600 dark:text-indigo-400",
      items: [
        ...clothingSuggestions,
        "Formal attire for university events",
        "Comfortable daily wear",
        "Undergarments and socks",
        "Personal hygiene items",
        "Prescription glasses/contacts",
        "Personal care products",
      ],
    },
    {
      id: "electronics",
      title: "Electronics & Adapters",
      icon: Zap,
      color: "text-yellow-600 dark:text-yellow-400",
      items: [
        `Power adapter for ${countryInfo?.plugType || "local plugs"}`,
        `Voltage converter (${countryInfo?.voltage || "check local voltage"})`,
        "Laptop and charger",
        "Phone and charger",
        "Universal power bank",
        "HDMI cable for presentations",
        "Headphones/earbuds",
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pre-Departure Checklist Generator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Generate a personalized, country-specific checklist for your study abroad journey.
        </p>
      </div>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Travel Information</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Provide your travel details to generate a customized checklist
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="country" className="dark:text-white">
                Destination Country
              </Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <SelectValue placeholder="Select destination country" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  {Object.keys(countryData).map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="month" className="dark:text-white">
                Month of Departure
              </Label>
              <Select value={formData.month} onValueChange={(value) => handleInputChange("month", value)}>
                <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <SelectValue placeholder="Select departure month" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accommodation" className="dark:text-white">
              Accommodation Type
            </Label>
            <Select value={formData.accommodation} onValueChange={(value) => handleInputChange("accommodation", value)}>
              <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                <SelectValue placeholder="Select accommodation type" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                {accommodationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequirements" className="dark:text-white">
              Special Requirements (Optional)
            </Label>
            <Textarea
              id="specialRequirements"
              value={formData.specialRequirements}
              onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
              placeholder="Dietary restrictions, medical needs, specific items you need to bring..."
              rows={3}
              className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {countryInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg"
            >
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                📍 Quick Info for {formData.country}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800 dark:text-blue-200">
                <div>• Currency: {countryInfo.currency}</div>
                <div>• Plug Type: {countryInfo.plugType}</div>
                <div>• Voltage: {countryInfo.voltage}</div>
                <div>• SIM Cards: {countryInfo.simRecommendation}</div>
              </div>
              {countryInfo.specialNotes && (
                <div className="mt-2 text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>Tip:</strong> {countryInfo.specialNotes}
                </div>
              )}
            </motion.div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !formData.country || !formData.month || !formData.accommodation}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            size="lg"
          >
            {isGenerating ? "Generating Your Checklist..." : "Generate Pre-Departure Checklist"}
          </Button>
        </CardContent>
      </Card>

      {showChecklist && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Progress Header */}
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="dark:text-white">Your Pre-Departure Checklist for {formData.country}</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Departing in {formData.month} • {formData.accommodation}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {getCompletionPercentage()}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mt-4">
                <motion.div
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm" className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save to Dashboard
                </Button>
                <Button variant="outline" size="sm" className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Important Warnings */}
          {countryInfo?.bannedMeds.length > 0 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900 dark:text-red-300">
                        ⚠️ Important: Banned Medications in {formData.country}
                      </h4>
                      <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                        The following medications are restricted or banned: {countryInfo.bannedMeds.join(", ")}
                      </p>
                      <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                        Always carry a doctor's prescription and check with embassy before traveling.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Checklist Sections */}
          <div className="grid gap-6">
            {checklistSections.map((section, sectionIndex) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * sectionIndex }}
                >
                  <Card className="dark:bg-slate-800 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3 dark:text-white">
                        <Icon className={`w-6 h-6 ${section.color}`} />
                        <span>{section.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {section.items.map((item, itemIndex) => {
                          const itemId = `${section.id}-${itemIndex}`
                          const isChecked = checkedItems[itemId] || false

                          return (
                            <motion.div
                              key={itemId}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 * itemIndex }}
                              className="flex items-center space-x-3 p-3 rounded-lg border dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                              <Checkbox
                                id={itemId}
                                checked={isChecked}
                                onCheckedChange={() => toggleChecklistItem(itemId)}
                                className="dark:border-slate-500"
                              />
                              <label
                                htmlFor={itemId}
                                className={`flex-1 text-sm cursor-pointer transition-all ${
                                  isChecked
                                    ? "line-through text-gray-500 dark:text-gray-400"
                                    : "text-gray-900 dark:text-gray-100"
                                }`}
                              >
                                {item}
                              </label>
                              {isChecked && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                            </motion.div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Additional Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-3">
                      💡 Pro Tips for {formData.country}
                    </h4>
                    <div className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
                      <div>• Pack essentials in carry-on in case checked luggage is delayed</div>
                      <div>• Keep digital copies of all documents in cloud storage</div>
                      <div>• Inform your bank about international travel to avoid card blocks</div>
                      <div>• Download offline maps and translation apps before departure</div>
                      {countryInfo?.specialNotes && <div>• {countryInfo.specialNotes}</div>}
                      {formData.specialRequirements && <div>• Custom note: {formData.specialRequirements}</div>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
