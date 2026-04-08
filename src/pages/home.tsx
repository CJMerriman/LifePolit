import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAction } from "convex/react";
import { api } from "@convex/api";
import { getGuestId } from "@/lib/guest";
import { useState } from "react";
import { 
  Sparkles, 
  Compass, 
  Trophy, 
  Users, 
  Rocket, 
  Zap, 
  Check, 
  Star, 
  MessageCircle, 
  Calendar, 
  LayoutGrid, 
  Target,
  ArrowRight,
  MapPin
} from "lucide-react";
import { toast } from "sonner";

export function HomePage() {
  const guestCheckout = useAction(api.pay.guestCheckout);
  const listProducts = useAction(api.pay.listProducts);
  const [loading, setLoading] = useState(false);

  const handlePremiumCheckout = async () => {
    setLoading(true);
    try {
      // Fetch products dynamically to get the correct priceId
      const products = await listProducts({});
      const premiumProduct = products.data?.find(
        (p: any) => p.product.slug === "premium"
      );
      if (!premiumProduct || !premiumProduct.prices?.[0]) {
        toast.error("Premium plan not available right now. Please try again later.");
        return;
      }
      const priceId = premiumProduct.prices[0].id;

      const { data, error } = await guestCheckout({
        productSlug: "premium",
        priceId,
        customerId: getGuestId(),
        customerName: "LifePilot User",
        successUrl: window.location.origin + "/?success=true",
      });

      if (error) {
        toast.error(error.message);
        return;
      }
      if (!data?.purchaseUrl) {
        toast.error("Could not create checkout. Please try again.");
        return;
      }

      window.open(data.purchaseUrl, "_blank", "noopener,noreferrer");
      toast.success("Checkout opened in a new tab!");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    toast.success("Welcome to LifePilot! Start exploring with your free daily mission.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">LifePilot</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <Button onClick={handleGetStarted} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 border-none">
            Get Started
          </Button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
          {/* Background Blobs */}
          <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
          
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <Badge variant="outline" className="mb-6 border-purple-500/50 bg-purple-500/10 text-purple-400 px-4 py-1">
              Now in Beta • Hixson, TN
            </Badge>
            <h1 className="mx-auto max-w-4xl text-balance text-5xl font-extrabold tracking-tight sm:text-7xl">
              Turn Your Real Life Into{" "}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                Epic Missions
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl">
              LifePilot uses AI to transform your daily routine into a cinematic adventure. 
              Direct your real life with purpose, discipline, and a touch of magic.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="h-12 px-8 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:opacity-90 transition-opacity border-none text-white font-bold">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="h-12 px-8 border-slate-700 bg-slate-900/50 hover:bg-slate-800">
                View Plans
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-950 bg-slate-800" />
                ))}
              </div>
              <span>Join 10,000+ pilots directing their lives</span>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-slate-900/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
              <p className="mt-4 text-slate-400">Three steps to starting your new story.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Pick your mood & goals",
                  desc: "Tell LifePilot how you're feeling and what you want to achieve today.",
                  icon: Sparkles
                },
                {
                  step: "02",
                  title: "Get a personalized AI mission",
                  desc: "Our engine crafts a unique quest tailored to your current state and long-term arcs.",
                  icon: Compass
                },
                {
                  step: "03",
                  title: "Complete, capture & share",
                  desc: "Execute your mission, log the moments, and watch your life story unfold.",
                  icon: Trophy
                }
              ].map((item, idx) => (
                <div key={idx} className="relative group p-8 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-purple-500/50 transition-all">
                  <div className="mb-4 text-5xl font-black text-slate-800 group-hover:text-purple-500/20 transition-colors">{item.step}</div>
                  <div className="mb-4 h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-400">Power Up Your Life</Badge>
              <h2 className="text-3xl font-bold sm:text-4xl italic tracking-tight">Your Day, Turned Into a Mission</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Daily Episodes",
                  desc: "Wake up to a new 'episode' of your life with AI-generated missions that keep things fresh.",
                  icon: Calendar
                },
                {
                  title: "Mood-to-Mission",
                  desc: "Tired, lonely, or anxious? LifePilot adjusts and gives you the perfect mission to bounce back.",
                  icon: Zap
                },
                {
                  title: "Life Arcs",
                  desc: "Choose your path: Glow-Up, Discipline, Social, Creative, or Healing. Your missions follow the arc.",
                  icon: Target
                },
                {
                  title: "Quest Cards",
                  desc: "Clear, actionable steps with built-in timers and focus modes to help you stay in the zone.",
                  icon: LayoutGrid
                },
                {
                  title: "Recap Engine",
                  desc: "Turn your daily accomplishments into cinematic, shareable cards for your social feed.",
                  icon: Star
                },
                {
                  title: "Solo or Group",
                  desc: "Invite friends to join your missions. Compete or collaborate on massive life goals.",
                  icon: Users
                }
              ].map((feature, idx) => (
                <Card key={idx} className="border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-800/60 transition-colors">
                  <CardHeader>
                    <div className="mb-2 h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-slate-100">{feature.title}</CardTitle>
                    <CardDescription className="text-slate-400">{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <h2 className="text-3xl font-bold">Direct Your Real Life</h2>
              <p className="mt-2 text-slate-400">Join 10,000+ people who stopped scrolling and started living.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  quote: "LifePilot turned my boring Tuesdays into something I actually look forward to. The AI missions are scarily accurate.",
                  author: "Sarah J.",
                  role: "Creative Director"
                },
                {
                  quote: "I've tried every habit tracker. This is the first one that feels like a game I actually want to play.",
                  author: "Marcus T.",
                  role: "Software Engineer"
                },
                {
                  quote: "The 'Recap Engine' is a game changer. Seeing my week as a cinematic journey is so motivating.",
                  author: "Elena R.",
                  role: "Student"
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                  <MessageCircle className="h-8 w-8 text-purple-500/40 mb-4" />
                  <p className="text-slate-300 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-700" />
                    <div>
                      <div className="font-bold text-slate-200">{testimonial.author}</div>
                      <div className="text-xs text-slate-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl">Choose Your Path</h2>
              <p className="mt-4 text-slate-400">Simple pricing for complex lives.</p>
            </div>
            <div className="grid gap-8 max-w-4xl mx-auto md:grid-cols-2">
              {/* Free Plan */}
              <Card className="border-slate-800 bg-slate-900/50 flex flex-col">
                <CardHeader>
                  <CardTitle>Rookie</CardTitle>
                  <CardDescription>Perfect for getting started</CardDescription>
                  <div className="mt-4 text-4xl font-bold">$0</div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> 1 daily mission
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> Basic recap cards
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> Limited life arcs
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> Community access
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-slate-700" onClick={handleGetStarted}>Get Started</Button>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="relative border-purple-500/50 bg-slate-900/80 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)] flex flex-col scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Recommended
                </div>
                <CardHeader>
                  <CardTitle>Elite Pilot</CardTitle>
                  <CardDescription>For those serious about their story</CardDescription>
                  <div className="mt-4 text-4xl font-bold">$9.99<span className="text-sm font-normal text-slate-500">/mo</span></div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2 font-medium">
                      <Check className="h-4 w-4 text-purple-500" /> Unlimited daily missions
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <Check className="h-4 w-4 text-purple-500" /> All Life Arcs unlocked
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <Check className="h-4 w-4 text-purple-500" /> Co-op missions with friends
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <Check className="h-4 w-4 text-purple-500" /> Advanced cinematic recaps
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <Check className="h-4 w-4 text-purple-500" /> Weekly AI strategy planning
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity border-none text-white font-bold" 
                    onClick={handlePremiumCheckout}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Go Premium"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-pink-900/20 -z-10" />
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold sm:text-5xl mb-6">Stop Scrolling. Start Your Story.</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400 mb-10">
              Join thousands of others in Hixson and beyond who are turning their daily lives into something legendary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input placeholder="Enter your email" className="bg-slate-900/50 border-slate-700 h-12" />
              <Button size="lg" className="bg-white text-black hover:bg-slate-200 h-12 px-8 font-bold" onClick={handleGetStarted}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-purple-500 to-pink-500">
                  <Rocket className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold">LifePilot</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs mb-4">
                The AI-powered life mission app designed to help you direct your real life with purpose and adventure.
              </p>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Hixson, TN</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#features" className="hover:text-purple-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">App Store</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Play Store</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-900 text-center text-sm text-slate-600">
            © 2026 LifePilot. All rights reserved. Made with ❤️ in Tennessee.
          </div>
        </div>
      </footer>
    </div>
  );
}
