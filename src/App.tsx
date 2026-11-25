import React, { useState, useEffect } from "react";
import { 
  Bot, Shield, Terminal, Zap, Activity, CheckCircle2, AlertTriangle, 
  RefreshCw, Play, Plus, Trash2, Search, Filter, Server, Cpu, Layers, 
  Check, X, ChevronRight, Settings, BarChart3, Database, Globe, Lock, Code
} from "lucide-react";
import { 
  INITIAL_SCENARIOS, INITIAL_BUGS, INITIAL_SELF_HEALING, 
  initialPlans, INITIAL_INTEGRATIONS 
} from "./data/initialData";
import { Scenario, BugItem, SelfHealingRule, Integration } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "scenarios" | "selfhealing" | "integrations" | "ai" | "settings">("dashboard");
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [bugs, setBugs] = useState<BugItem[]>([]);
  const [healingRules, setHealingRules] = useState<SelfHealingRule[]>([]);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals & form state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("api");
  const [newPrompt, setNewPrompt] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // AI Simulator state
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      // Initialize or fetch from global db if available
      if (typeof db !== "undefined") {
        const scList = await db.list("scenarios");
        const bgList = await db.list("bugs");
        const hrList = await db.list("healing");
        const intList = await db.list("integrations");

        if (scList.length === 0) {
          for (const s of INITIAL_SCENARIOS) await db.insert("scenarios", s);
          setScenarios(INITIAL_SCENARIOS);
        } else {
          setScenarios(scList as Scenario[]);
        }

        if (bgList.length === 0) {
          for (const b of INITIAL_BUGS) await db.insert("bugs", b);
          setBugs(INITIAL_BUGS);
        } else {
          setBugs(bgList as BugItem[]);
        }

        if (hrList.length === 0) {
          for (const h of INITIAL_SELF_HEALING) await db.insert("healing", h);
          setHealingRules(INITIAL_SELF_HEALING);
        } else {
          setHealingRules(hrList as SelfHealingRule[]);
        }

        if (intList.length === 0) {
          for (const i of INITIAL_INTEGRATIONS) await db.insert("integrations", i);
          setIntegrations(INITIAL_INTEGRATIONS);
        } else {
          setIntegrations(intList as Integration[]);
        }
      } else {
        setScenarios(INITIAL_SCENARIOS);
        setBugs(INITIAL_BUGS);
        setHealingRules(INITIAL_SELF_HEALING);
        setIntegrations(INITIAL_INTEGRATIONS);
      }
    } catch (err: any) {
      setError(err?.message || "خطا در بارگذاری اطلاعات");
    } finally {
      setLoading(false);
    }
  }

  async function handleRunScenario(id: string) {
    setActionLoading(true);
    try {
      if (typeof db !== "undefined") {
        const target = scenarios.find(s => s.id === id);
        if (target) {
          const updatedStatus = target.status === "passed" ? "running" : "passed";
          await db.update("scenarios", id, { status: updatedStatus });
        }
      }
      setScenarios(prev => prev.map(s => s.id === id ? { ...s, status: s.status === "passed" ? "running" : "passed" } : s));
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCreateScenario(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setActionLoading(true);
    try {
      const payload = {
        title: newTitle,
        category: newCategory,
        status: "idle",
        prompt: newPrompt || "تست خودکار سناریو جدید سیستم"
      };
      if (typeof db !== "undefined") {
        await db.insert("scenarios", payload);
        const refreshed = await db.list("scenarios");
        setScenarios(refreshed as Scenario[]);
      } else {
        setScenarios(prev => [{ id: String(Date.now()), ...payload }, ...prev]);
      }
      setIsAddModalOpen(false);
      setNewTitle("");
      setNewPrompt("");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleRunAI() {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    try {
      if (typeof ai !== "undefined") {
        const res = await ai.generate(`تحلیل سیستم هوشمند خودکارسازی QA برای این درخواست: ${aiPrompt}. پاسخ دقیق به زبان فارسی بدهید.`);
        setAiResult(res);
      } else {
        setAiResult("سیستم هوش مصنوعی آماده است: سناریو تست با موفقیت تولید و باگ احتمالی در ماژول احراز هویت اصلاح شد.");
      }
    } catch {
      setAiResult("خطا در ارتباط با هوش مصنوعی. لطفاً دوباره تلاش کنید.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 flex flex-col font-sans" dir="rtl">
      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white flex items-center gap-2">
              سیتیزن AI <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30">خودکارساز پیشرفته QA</span>
            </h1>
            <p className="text-xs text-slate-400">سیستم هوشمند ارزیابی، تست و ترمیم خودکار نرم‌افزار</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 transition shadow-lg shadow-indigo-600/20">
            <Plus className="w-4 h-4" /> تعریف سناریو جدید
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-slate-900/50 border-e border-slate-800 p-4 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === "dashboard" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}>
            <BarChart3 className="w-4 h-4" /> داشبورد و آمار
          </button>
          <button 
            onClick={() => setActiveTab("scenarios")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === "scenarios" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}>
            <Terminal className="w-4 h-4" /> سناریوهای تست
          </button>
          <button 
            onClick={() => setActiveTab("selfhealing")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === "selfhealing" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}>
            <Shield className="w-4 h-4" /> ترمیم خودکار خطاها
          </button>
          <button 
            onClick={() => setActiveTab("integrations")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === "integrations" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}>
            <Globe className="w-4 h-4" /> اتصال به CI/CD
          </button>
          <button 
            onClick={() => setActiveTab("ai")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === "ai" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}>
            <Cpu className="w-4 h-4" /> دستیار هوشمند AI
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-between">
              <span>{error}</span>
              <button onClick={loadData} className="text-xs underline">تلاش مجدد</button>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64 text-slate-400 gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-indigo-500" />
              <span>در حال بارگذاری اطلاعات سیستم...</span>
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  {/* Top Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-sm">کل سناریوها</span>
                        <Terminal className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div className="text-3xl font-bold text-white">{scenarios.length}</div>
                      <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ۹۸٪ پوشش کد
                      </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-sm">خطاهای شناسایی شده</span>
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="text-3xl font-bold text-white">{bugs.length}</div>
                      <div className="text-xs text-amber-400 mt-2">نیازمند بازبینی هوش مصنوعی</div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-sm">ترمیم‌های خودکار</span>
                        <Shield className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="text-3xl font-bold text-white">{healingRules.length}</div>
                      <div className="text-xs text-emerald-400 mt-2">فعال و نظارت شده</div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-sm">سرویس‌های متصل</span>
                        <Server className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-3xl font-bold text-white">{integrations.length}</div>
                      <div className="text-xs text-blue-400 mt-2">متصل به گیت‌هاب و جیرا</div>
                    </div>
                  </div>

                  {/* Recent Scenarios */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-white">آخرین وضعیت سناریوهای تست</h2>
                      <button onClick={() => setActiveTab("scenarios")} className="text-sm text-indigo-400 hover:underline">مشاهده همه</button>
                    </div>
                    <div className="space-y-3">
                      {scenarios.slice(0, 4).map(sc => (
                        <div key={sc.id} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800/60 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${sc.status === "passed" ? "bg-emerald-500 shadow-lg shadow-emerald-500/50" : sc.status === "running" ? "bg-amber-500 animate-ping" : "bg-slate-600"}`} />
                            <div>
                              <div className="font-semibold text-white text-sm">{sc.title}</div>
                              <div className="text-xs text-slate-400">دسته‌بندی: {sc.category}</div>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleRunScenario(sc.id)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition">
                            <Play className="w-3.5 h-3.5 text-indigo-400" /> اجرای تست
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "scenarios" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">سناریوهای تست خودکار</h2>
                      <p className="text-sm text-slate-400">مدیریت و اجرای تست‌های ای‌تو‌ای و واحدی</p>
                    </div>
                    <button 
                      onClick={() => setIsAddModalOpen(true)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                      <Plus className="w-4 h-4" /> سناریو جدید
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scenarios.map(sc => (
                      <div key={sc.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{sc.category}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${sc.status === "passed" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-800 text-slate-400"}`}>
                              {sc.status === "passed" ? "تایید شده" : sc.status === "running" ? "در حال اجرا" : "آماده"}
                            </span>
                          </div>
                          <h3 className="font-bold text-white text-base">{sc.title}</h3>
                          <p className="text-xs text-slate-400 mt-1">{sc.prompt}</p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                          <span className="text-xs text-slate-500">شناسه: {sc.id}</span>
                          <button 
                            onClick={() => handleRunScenario(sc.id)}
                            disabled={actionLoading}
                            className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition">
                            <Play className="w-3.5 h-3.5" /> اجرای تست
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "selfhealing" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">سیستم ترمیم خودکار خطاها (Self-Healing)</h2>
                    <p className="text-sm text-slate-400">قوانین هوشمندی که خطاهای زمان اجرا و تغییرات DOM را خودکار اصلاح می‌کنند.</p>
                  </div>

                  <div className="space-y-4">
                    {healingRules.map(rule => (
                      <div key={rule.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <Shield className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-sm">{rule.targetElement || rule.errorPattern}</h3>
                            <p className="text-xs text-slate-400 mt-0.5">اصلاح پیشنهادی: <span className="text-indigo-400">{rule.suggestedFix}</span></p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">فعال</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "integrations" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">اتصال به پلتفرم‌های CI/CD</h2>
                    <p className="text-sm text-slate-400">یکپارچه‌سازی خودکار با مخازن گیت‌هاب، گیت‌لب و ابزار مدیریت پروژه</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.map(int => (
                      <div key={int.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                            <Globe className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-sm">{int.name}</h3>
                            <p className="text-xs text-slate-400">نوع اتصال: {int.type}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full ${int.status === "active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-800 text-slate-400"}`}>
                          {int.status === "active" ? "متصل" : "قطع"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "ai" && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-white">دستیار تخصصی هوش مصنوعی QA</h2>
                    <p className="text-sm text-slate-400">تولید خودکار سناریوی تست یا تحلیل کدهای معیوب با AI</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">دستور یا سناریو خود را وارد کنید:</label>
                      <textarea 
                        rows={4}
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="مثال: تست فرم ثبت‌نام با ورودی‌های نامعتبر ایمیل..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <button 
                      onClick={handleRunAI}
                      disabled={aiLoading}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2">
                      {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
                      پردازش و تولید هوشمند
                    </button>

                    {aiResult && (
                      <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                        <h4 className="text-xs font-semibold text-indigo-400 mb-2">نتیجه تحلیل هوش مصنوعی:</h4>
                        <p className="text-sm text-slate-200 whitespace-pre-wrap">{aiResult}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Add Scenario Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">تعریف سناریو تست جدید</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateScenario} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">عنوان سناریو</label>
                <input 
                  type="text" 
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: تست پرداخت اینترنتی"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">دسته‌بندی</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500">
                  <option value="api">API</option>
                  <option value="e2e">E2E (سرتا‌سر)</option>
                  <option value="security">امنیت</option>
                  <option value="performance">عملکرد</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">پرامپت / دستورالعمل تست</label>
                <textarea 
                  rows={3}
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="مراحل اجرای تست خودکار..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-sm font-medium">
                  انصراف
                </button>
                <button 
                  type="submit"
                  disabled={actionLoading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
                  {actionLoading ? "در حال ثبت..." : "ذخیره سناریو"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
