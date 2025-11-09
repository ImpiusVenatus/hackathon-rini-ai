"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaRobot,
  FaBolt,
  FaLock,
  FaChartBar,
  FaBullseye,
  FaGlobe,
  FaRocket,
  FaStar,
} from "react-icons/fa";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    icon: FaRobot,
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning algorithms analyze thousands of data points to provide accurate credit assessments.",
  },
  {
    icon: FaBolt,
    title: "Instant Results",
    description:
      "Get your credit score in seconds, not days. No lengthy paperwork or waiting periods.",
  },
  {
    icon: FaLock,
    title: "Secure & Private",
    description:
      "Bank-level encryption ensures your financial data is protected with the highest security standards.",
  },
  {
    icon: FaChartBar,
    title: "Detailed Insights",
    description:
      "Understand what affects your score with comprehensive breakdowns and actionable recommendations.",
  },
  {
    icon: FaBullseye,
    title: "Personalized Recommendations",
    description:
      "Receive tailored advice on how to improve your credit score based on your unique financial profile.",
  },
  {
    icon: FaGlobe,
    title: "Global Coverage",
    description:
      "Works across multiple countries and credit bureaus, providing consistent scoring worldwide.",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect Your Accounts",
    description:
      "Securely link your financial accounts with our encrypted connection.",
  },
  {
    number: "02",
    title: "AI Analysis",
    description:
      "Our AI processes your financial data using advanced algorithms.",
  },
  {
    number: "03",
    title: "Get Your Score",
    description: "Receive your credit score and detailed insights instantly.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Small Business Owner",
    content:
      "This platform helped me understand my credit better than any traditional service. The AI insights are incredibly detailed.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Financial Advisor",
    content:
      "I recommend this to all my clients. The speed and accuracy of the credit scoring is unmatched.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Entrepreneur",
    content:
      "Finally, a credit scoring platform that actually explains what affects my score and how to improve it.",
    rating: 5,
  },
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(25, 153, 128, 0.15), transparent 50%)`,
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#199980]/10 px-4 py-2 text-sm font-semibold text-[#199980]"
            >
              <FaRocket className="text-[#199980]" />
              Powered by Advanced AI Technology
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            >
              Credit Scoring
              <br />
              <span className="text-[#199980]">Reimagined</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mb-10 max-w-2xl text-xl text-slate-600"
            >
              Get instant, accurate credit scores powered by cutting-edge AI.
              Understand your financial health with detailed insights and
              personalized recommendations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    const isAuthenticated =
                      localStorage.getItem("isAuthenticated") === "true";
                    if (isAuthenticated) {
                      window.location.href = "/report/introduction";
                    } else {
                      window.location.href = "/signup";
                    }
                  }
                }}
                className="cursor-pointer rounded-full bg-[#199980] px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#158066]"
              >
                Get Started Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-full border-2 border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 transition-all hover:border-[#199980] hover:bg-slate-50"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">
              Why Choose Our Platform
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Experience the future of credit scoring with AI-powered insights
              and instant results.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-2xl"
                >
                  <div className="mb-4 text-4xl text-[#199980]">
                    <IconComponent />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Get your credit score in three simple steps
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="rounded-2xl bg-[#199980] p-8 text-white shadow-xl">
                  <div className="mb-4 text-5xl font-bold opacity-50">
                    {step.number}
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold">{step.title}</h3>
                  <p className="text-white/90">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-8 rounded-3xl bg-[#199980] p-12 text-center text-white shadow-2xl sm:grid-cols-3"
          >
            {[
              { value: "1M+", label: "Users Trust Us" },
              { value: "99.9%", label: "Accuracy Rate" },
              { value: "< 30s", label: "Average Response Time" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-2 text-5xl font-bold">{stat.value}</div>
                <div className="text-xl text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Join thousands of satisfied users who have transformed their
              credit journey
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="rounded-2xl bg-white p-8 shadow-lg"
              >
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-slate-600">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-500">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-[#199980] p-12 text-center text-white shadow-2xl"
          >
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Join thousands of users who have improved their credit scores with
              AI-powered insights.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (typeof window !== "undefined") {
                  const isAuthenticated =
                    localStorage.getItem("isAuthenticated") === "true";
                  if (isAuthenticated) {
                    window.location.href = "/report/introduction";
                  } else {
                    window.location.href = "/signup";
                  }
                }
              }}
              className="cursor-pointer rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#199980] shadow-lg transition-all hover:bg-[#199980]/10"
            >
              Start Your Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                RiniAI
              </h3>
              <p className="text-slate-600">
                AI-powered credit scoring for the modern world.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-900">Product</h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <a href="#" className="cursor-pointer hover:text-[#199980]">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-pointer hover:text-[#199980]">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-pointer hover:text-[#199980]">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-900">Company</h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <a href="#" className="cursor-pointer hover:text-[#199980]">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-pointer hover:text-[#199980]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-pointer hover:text-[#199980]">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-900">Support</h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <a href="#" className="cursor-pointer hover:text-[#199980]">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-pointer hover:text-[#199980]">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-pointer hover:text-[#199980]">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8 text-center text-slate-600">
            <p>&copy; 2024 RiniAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
