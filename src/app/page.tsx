"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
// Replace Heroicons with MUI icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
// Replace Headless UI with MUI Accordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from 'next/link'
import {ChatBot} from "@/UI";
const montserrat = Montserrat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

// Sample FAQ data
const faqs = [
  {
    question: "What is UniBot?",
    answer:
        "UniBot is an AI-powered assistant designed to help newly admitted students with their queries and help them navigate university life.",
  },
  {
    question: "How does UniBot work?",
    answer:
        "UniBot uses advanced natural language processing (NLP) and machine learning algorithms to understand your questions and provide relevant responses.",
  },
  {
    question: "Is UniBot available 24/7?",
    answer:
        "Yes, UniBot is designed to be available around the clock to assist you whenever you need it.",
  },
  {
    question: "What platforms does UniBot support?",
    answer:
        "UniBot is available on multiple platforms, including web and mobile apps.",
  },
  {
    question: "How much does UniBot cost?",
    answer: "UniBot is a free resource for all newly admitted students.",
  },
  {
    question: "What kind of information can I get from UniBot?",
    answer:
        "You can ask about admissions, registration, campus facilities, courses, student support services, and more.",
  },
];

export default function HomePage() {
  return (
      <div className={montserrat.className}>
        {/* Login and Register Buttons */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <Link href="/login">
          <button className="bg-white/90 text-blue-600 hover:bg-white/80 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200 text-sm">
            Login
          </button>
          </Link>
          <Link href="/register">

          <button className="bg-white/90 text-green-600 hover:bg-white/80 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200 text-sm">
            Register
          </button>
          </Link>
        </div>

        {/* Hero Section */}
        <section
            id="hero"
            className="bg-gradient-to-br from-purple-500 to-blue-600 py-24"
        >
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold text-white">
              Welcome to Wrocław University of Science and Technology
            </h1>
            <p className="text-lg text-gray-200 mt-4">
              Your Smart Assistant for a Smooth Transition into University Life
            </p>
            <div className="mt-8 space-x-4 flex flex-col items-center">
              <Image
                  src="/bot-image.png"
                  alt="UniBot"
                  width={200}
                  height={200}
                  className="rounded-full mb-8"
              />
              <div className="flex gap-4">
                <Link href="/socket-example">

                <button className="bg-white text-purple-600 hover:bg-white/90 font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-300">
                  Get Started
                </button>
                </Link>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white/20 font-semibold py-3 px-6 rounded-full transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-blue-700">Key Features</h2>
            <p className="mt-4 text-gray-600">UniBot helps you with :</p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1: 24/7 Availability */}
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <CloudUploadIcon className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="mt-2 text-xl font-semibold text-blue-600">
                  24/7 Availability
                </h3>
                <p className="mt-2 text-gray-500">
                  Get assistance anytime, day or night.
                </p>
              </div>

              {/* Feature 2: Instant Responses */}
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <FlashOnIcon className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="mt-2 text-xl font-semibold text-blue-600">
                  Instant Responses
                </h3>
                <p className="mt-2 text-gray-500">
                  Get quick and efficient answers.
                </p>
              </div>

              {/* Feature 3: Personalized Interactions */}
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <AccountCircleIcon className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="mt-2 text-xl font-semibold text-blue-600">
                  Personalized Interactions
                </h3>
                <p className="mt-2 text-gray-500">
                  Get tailored and relevant information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section
            id="cta"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Ready to Start Your Journey at Wrocław University of Science and
              Technology?
            </h2>
            <p className="text-lg opacity-90 mb-10">
              Ask UniBot anything to get started!
            </p>
            <button className="bg-white text-blue-600 hover:bg-white/90 font-semibold py-3 px-8 rounded-full shadow-xl transition-colors duration-300 text-lg">
              Get Started Now
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold text-blue-700 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="w-full text-left bg-white rounded-lg shadow-md py-3 px-4 flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                    >
                  <span className="text-gray-800 font-medium">
                    {faq.question}
                  </span>
                    </AccordionSummary>
                    <AccordionDetails className="px-4 pt-2 pb-4 bg-gray-50 rounded-b-lg">
                      <p className="text-gray-600">{faq.answer}</p>
                    </AccordionDetails>
                  </Accordion>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-gray-800 text-gray-300 py-8">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} UniBot. All rights reserved.</p>
          </div>
        </footer>
        <ChatBot />
      </div>
  );
}