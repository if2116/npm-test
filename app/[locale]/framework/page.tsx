'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Target,
  Users,
  GitFork,
  TrendingUp,
  CheckCircle2,
  BarChart3,
  Zap,
  Shield,
  DollarSign,
  Award,
  ArrowRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function FrameworkPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isChina = locale === 'zh';

  const philosophyItems = [
    {
      id: '01',
      title: isChina ? '任务驱动' : 'Task-Driven Approach',
      description: isChina
        ? '我们不测试模型的通用能力，而是针对具体的业务场景任务进行评估，确保解决方案在真实环境中的可用性。'
        : 'We don\'t test general model capabilities. Instead, we evaluate specific business scenario tasks to ensure solutions work in real-world environments.',
      icon: Target,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: '02',
      title: isChina ? '人机协同' : 'Human-in-the-Loop',
      description: isChina
        ? '通过HITL（Human-in-the-Loop）机制，将人类专家的知识融入AI系统，提升准确性和可信度。'
        : 'Through HITL (Human-in-the-Loop) mechanisms, we incorporate human expert knowledge into AI systems to improve accuracy and trustworthiness.',
      icon: Users,
      color: 'bg-success',
      bgColor: 'bg-green-50',
    },
    {
      id: '03',
      title: isChina ? '开放生态' : 'Open Ecosystem',
      description: isChina
        ? '所有最佳实践均基于开源技术栈，避免供应商锁定，让企业能够自主掌控AI能力。'
        : 'All best practices are based on open-source technology stacks, avoiding vendor lock-in and enabling enterprises to maintain control over their AI capabilities.',
      icon: GitFork,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      id: '04',
      title: isChina ? '持续验证' : 'Continuous Validation',
      description: isChina
        ? '通过"擂台"机制持续评估和更新最佳实践，确保企业能够获得最新的技术方案。'
        : 'Through the Arena mechanism, we continuously evaluate and update best practices to ensure enterprises have access to the latest technological solutions.',
      icon: TrendingUp,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
    },
  ];

  const pillars = [
    {
      letter: 'Q',
      name: isChina ? '质量' : 'Quality',
      description: isChina ? '输出结果的准确性和可靠性' : 'Accuracy and reliability of output',
      icon: CheckCircle2,
      color: 'bg-success',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      letter: 'E',
      name: isChina ? '效率' : 'Efficiency',
      description: isChina ? '处理速度和资源利用效率' : 'Processing speed and resource efficiency',
      icon: Zap,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      letter: 'C',
      name: isChina ? '成本' : 'Cost',
      description: isChina ? '部署和运营的经济性' : 'Economic feasibility of deployment and operations',
      icon: DollarSign,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      letter: 'T',
      name: isChina ? '可信度' : 'Trust',
      description: isChina ? '安全性和合规性' : 'Security and compliance',
      icon: Shield,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50/30 py-20 sm:py-28">
          <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
          <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
            <Badge variant="outline" className="mb-6 bg-white">
              <Award className="mr-2 h-4 w-4" />
              {isChina ? '技术框架' : 'Technical Framework'}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
              {t('framework.title')}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              {t('framework.subtitle')}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16">
          {/* What is RWAI */}
          <section className="mb-16">
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                {isChina ? '什么是RWAI-S框架？' : 'What is the RWAI-S Framework?'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isChina
                  ? 'RWAI-S（Real-World AI Symbiosis）框架是一个学术性开源项目，致力于填补AI研究与实际应用之间的"实施鸿沟"。我们将AI模型在学术基准上的高性能与在高风险动态环境中运营价值之间的断裂作为核心问题，提出了人机共生（Human-AI Symbiosis）的新范式。'
                  : 'RWAI-S (Real-World AI Symbiosis) is an academic open-source project dedicated to bridging the "implementation gap" between AI research and real-world applications. We address the disconnect between high model performance on academic benchmarks and operational value in dynamic, high-stakes environments, proposing a new paradigm of Human-AI Symbiosis.'}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {isChina
                  ? '从"人在回路"（HITL）到"人机共生"（Symbiosis），我们重新定义了人类智能（HI）与人工智能（AI）的关系，从被动纠错转向主动价值对齐。通过形式化的任务集（Task Set）和上下文对齐（Contextual Alignment）机制，确保AI系统在真实世界场景中的可操作性和鲁棒性。'
                  : 'From "Human-in-the-Loop" (HITL) to "Human-AI Symbiosis," we redefine the relationship between Human Intelligence (HI) and Artificial Intelligence (AI), shifting from passive error correction to active value alignment. Through formalized Task Sets and Contextual Alignment mechanisms, we ensure AI systems are operable and robust in real-world scenarios.'}
              </p>
            </div>
          </section>

          {/* Theoretical Foundation */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {isChina ? '理论基础' : 'Theoretical Foundation'}
            </h2>
            <div className="space-y-6">
              {/* Task Set */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-card">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {isChina ? '任务集（Task Set）形式化' : 'Task Set Formalization'}
                </h3>
                <p className="text-gray-700 mb-4">
                  {isChina
                    ? '我们通过五元组 T = ⟨G, K, M, P, L⟩ 形式化定义真实世界任务，将静态的"数据集"概念扩展为动态的"任务集"，显式建模目标、知识、评估指标、交互协议和历史轨迹。'
                    : 'We formalize real-world tasks through a 5-tuple T = ⟨G, K, M, P, L⟩, extending the static "dataset" concept to a dynamic "Task Set" that explicitly models goals, knowledge, evaluation metrics, interaction protocols, and historical trajectories.'}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { code: 'G', name: isChina ? '目标本体' : 'Goal Ontology', desc: isChina ? '层次化目标分解' : 'Hierarchical goal decomposition' },
                    { code: 'K', name: isChina ? '领域知识图谱' : 'Domain Knowledge Graph', desc: isChina ? '动态知识状态' : 'Dynamic knowledge state' },
                    { code: 'M', name: isChina ? '评估指标矩阵' : 'Evaluation Metric Matrix', desc: isChina ? '多维度性能标准' : 'Multi-dimensional criteria' },
                    { code: 'P', name: isChina ? '交互协议集' : 'Interaction Protocol Set', desc: isChina ? '协作规则定义' : 'Collaboration rules' },
                  ].map((item) => (
                    <div key={item.code} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold">
                        {item.code}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contextual Alignment */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-card">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {isChina ? '上下文对齐（Contextual Alignment）' : 'Contextual Alignment'}
                </h3>
                <p className="text-gray-700 mb-4">
                  {isChina
                    ? '传统对齐研究关注"通用"人类价值观，但真实世界的AI部署本质上是上下文相关的。我们将上下文对齐定义为优化向量空间中的距离，最小化关系失调（Relational Dissonance）和对齐债务（Alignment Debt）。'
                    : 'Traditional alignment research focuses on "universal" human values, but real-world AI deployment is inherently contextual. We define Contextual Alignment as optimizing vector distance to minimize Relational Dissonance and Alignment Debt.'}
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { name: isChina ? '操作上下文' : 'Operational', desc: isChina ? '工作流遵守' : 'Workflow adherence' },
                    { name: isChina ? '文化上下文' : 'Cultural', desc: isChina ? '沟通规范' : 'Communication norms' },
                    { name: isChina ? '时间上下文' : 'Temporal', desc: isChina ? '状态感知' : 'State awareness' },
                  ].map((item) => (
                    <div key={item.name} className="p-4 rounded-lg bg-gradient-to-br from-primary-50 to-white border border-primary-100">
                      <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Human-AI Symbiosis */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-card">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {isChina ? '人机共生（Human-AI Symbiosis）' : 'Human-AI Symbiosis'}
                </h3>
                <p className="text-gray-700 mb-4">
                  {isChina
                    ? '从"工具"到"队友"的范式转变，要求重新思考AI代理的本体地位。我们提出了双向认知对齐、上下文感知代理和关系和谐三个核心原则，创建超越任一独立实体的"半人马系统"（Centaurian Systems）。'
                    : 'The paradigm shift from "tool" to "teammate" requires rethinking the ontological status of AI agents. We propose three core principles: Bidirectional Cognitive Alignment, Context-Aware Agency, and Relational Consonance, creating "Centaurian Systems" that surpass either entity operating alone.'}
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    isChina ? '双向认知对齐' : 'Bidirectional Alignment',
                    isChina ? '上下文感知代理' : 'Context-Aware Agency',
                    isChina ? '关系和谐' : 'Relational Consonance',
                    isChina ? '扩展自我' : 'Extended Self',
                    isChina ? '联合系统状态' : 'Joint System State',
                  ].map((item) => (
                    <span key={item} className="px-4 py-2 rounded-full bg-blue-50 text-primary text-sm font-semibold border border-blue-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Core Philosophy */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {isChina ? '核心理念' : 'Core Philosophy'}
            </h2>
            <div className="grid gap-6">
              {philosophyItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-5">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${item.bgColor} ${item.color} transition-all group-hover:scale-110`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-gray-400">{item.id}</span>
                          <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    {/* Decorative corner accent */}
                    <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-gray-100 to-transparent transition-all group-hover:from-gray-200`} />
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Four-Dimensional Evaluation */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isChina ? '四维评估体系' : 'Four-Dimensional Evaluation'}
            </h2>
            <p className="text-gray-700 mb-8 text-lg">
              {isChina
                ? '每个AI实践方案都从四个维度进行评估：质量（Quality）、效率（Efficiency）、成本（Cost）、可信度（Trust）。'
                : 'Each AI practice is evaluated across four dimensions: Quality, Efficiency, Cost, and Trust.'}
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.letter}
                    className={`group relative overflow-hidden rounded-2xl border-2 ${pillar.borderColor} ${pillar.bgColor} p-6 transition-all hover:shadow-lg`}
                  >
                    <div className="relative">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${pillar.color} text-white text-xl font-bold shadow-sm`}>
                          {pillar.letter}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`h-5 w-5 ${pillar.color.replace('bg-', 'text-')}`} />
                            <h3 className="text-lg font-bold text-gray-900">{pillar.name}</h3>
                          </div>
                          <p className="text-gray-700 text-sm">{pillar.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How to Participate */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {isChina ? '如何参与' : 'How to Participate'}
            </h2>
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-card">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  isChina ? '提交您的AI实践方案参与"打擂"' : 'Submit your AI practice to compete in the Arena',
                  isChina ? '为现有方案投票和提供反馈' : 'Vote and provide feedback on existing solutions',
                  isChina ? '在GitHub上贡献代码和改进' : 'Contribute code and improvements on GitHub',
                  isChina ? '与社区分享您的使用经验' : 'Share your experience with the community',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-2xl border-2 border-primary bg-gradient-to-br from-primary-50 to-white p-10 text-center shadow-card">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isChina ? '准备好开始了吗？' : 'Ready to Get Started?'}
            </h3>
            <p className="text-gray-700 mb-8 max-w-xl mx-auto">
              {isChina
                ? '探索AI最佳实践，或提交您自己的方案'
                : 'Explore AI best practices or submit your own solution'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="shadow-soft">
                <Link href={`/${locale}/arena`}>
                  {isChina ? '浏览擂台' : 'Browse Arena'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`/${locale}/contact`}>
                  {isChina ? '联系我们' : 'Contact Us'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
