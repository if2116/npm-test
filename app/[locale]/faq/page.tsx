'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations, useLocale } from 'next-intl';
import { HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default function FAQPage() {
  const locale = useLocale();
  const isChina = locale === 'zh';
  const t = useTranslations();

  const faqs = [
    {
      q: isChina ? '什么是Real-World AI？' : 'What is Real-World AI?',
      a: isChina
        ? 'Real-World AI是一个学术性开源项目，专注**真实场景的AI落地**。目前主要通过开源代码、文档及其关联的其他资源链接，分享解决真实场景AI落地各种问题的最佳实践案例。目前项目为内测版本，欢迎大家试用和反馈意见。'
        : 'Real-World AI is an academic open-source project focused on **real-world AI deployment**. We share best practices for solving real-world AI challenges through open-source code, documentation, and related resources. The project is currently in beta, and we welcome your testing and feedback.',
    },
    {
      q: isChina ? 'Real-World AI的Arena是什么？为什么以"擂台"的方式评选最佳实践？' : 'What is the Real-World AI Arena? Why use the "Arena" format to select best practices?',
      a: isChina
        ? '在AI落地的过程中，我们最常遇到的两个问题是："我这个场景的问题如何用AI解决，如何快速落地验证效果？"和"什么样的解决方案是最好/最适合我的？"\n\n我们将AI落地的一些常见场景作为"擂台"，在不断更新的AI技术和应用中寻找最佳实践（SOTA），并评选特定场景的"擂主"。通过**"清华严选"**，解决**技术选型和试错成本**问题。\n\n真实场景的AI落地评判标准是较为复杂的，很难像学术榜单一样有绝对的分值，所以我们不做排名，只综合评定最佳实践。由于适配环境不同，即使同一个场景的擂台也可能有多个"擂主"，例如适配私部署的版本，适合云端服务的版本，等等。'
        : 'In AI deployment, we most commonly encounter two questions: "How can I solve this scenario\'s problem with AI and quickly validate results?" and "What solution is best/suitable for me?"\n\nWe treat common AI deployment scenarios as "Arenas," continuously seeking best practices (SOTA) from evolving AI technologies and applications, and selecting the "champion" for each scenario. Through **"Tsinghua Curated"** selection, we solve **technology selection and trial cost** problems.\n\nReal-world AI deployment evaluation criteria are complex and difficult to score absolutely like academic benchmarks, so we don\'t rank but comprehensively evaluate best practices. Due to different adaptation environments, even the same scenario arena may have multiple "champions," such as versions suitable for private deployment or cloud services.',
    },
    {
      q: isChina ? 'Real-World AI解决什么问题？和Github、Huggingface等其他的开源项目有什么区别？' : 'What problems does Real-World AI solve? How is it different from other open-source projects like GitHub and Huggingface?',
      a: isChina
        ? '目前AI相关的开源社区有很丰富的开源生态，以代码开源和实践分享为主。然而AI落地是个复杂而浩大的工程，核心难点在**人与AI的交互和实践**，包括：业务需求的引导和细化、专家知识的输入、技术方案的设计、业务应用的流程等。\n\n因此，仅有AI技术或代码是不够的，**Talk is cheap, code is not enough, PRACTICE is all we need.**\n\n我们尝试建模和还原AI落地的**"人在回路"（HITL）系统**，确保**可验证、可实践、可复刻**，走通AI落地的**"最后一公里"**。因此，从学术的角度而言，Real-World AI希望和大家一起做真实世界人与AI交互的建模（Modelling of Real-World HI-AI Interactions）和任务数据集（Task Set），最终实现智能化的真实世界AI实践生成（NL2Practice）。'
        : 'Current AI open-source communities have rich ecosystems focusing mainly on code sharing and practice sharing. However, AI deployment is a complex and massive engineering challenge, with core difficulties in **human-AI interaction and practice**, including: business requirement guidance and refinement, expert knowledge input, technical solution design, and business application workflows.\n\nTherefore, having only AI technology or code is not enough. **Talk is cheap, code is not enough, PRACTICE is all we need.**\n\nWe attempt to model and restore AI deployment\'s **"Human-in-the-Loop" (HITL) system**, ensuring **verifiability, practicality, and replicability**, completing the **"last mile"** of AI deployment. From an academic perspective, Real-World AI hopes to work with everyone on modeling real-world human-AI interactions and Task Sets, ultimately achieving intelligent real-world AI practice generation (NL2Practice).',
    },
    {
      q: isChina ? '我能在Real-World AI中获得哪些资源？' : 'What resources can I get from Real-World AI?',
      a: isChina
        ? '您能在Real-World AI中了解、参与、分享基于最新AI技术的各类真实场景最佳实践方案。'
        : 'You can learn about, participate in, and share various real-world best practice solutions based on the latest AI technologies in Real-World AI.',
    },
    {
      q: isChina ? 'Real-World AI的用户群体有哪些？我不是程序员也不懂算法，可以使用吗？' : 'Who are Real-World AI\'s user groups? Can I use it if I\'m not a programmer or don\'t understand algorithms?',
      a: isChina
        ? 'Real-World AI的目的是让尽可能多和AI落地相关的伙伴获得帮助、参与共建。\n\n**领导决策者**可以了解最新的技术发展趋势和在产业应用的真实案例\n\n**业务专家**可以了解、参考和实践在自身行业快速搭建AI的落地全流程\n\n**技术开发者**可以了解、复刻在不同场景应用最新技术的实际效果和最佳案例\n\n即使不懂算法、不会写代码，也能找到许多低门槛、零/低代码的实践方案。我们在每个方案中会注明不同用户角色所需的技能和知识，方便您了解如何快速搭建自己的AI团队。另外，这些方案中也包含了业务、产品等团队可供参考的各个环节，帮助您实践一个项目从"点子"到"Demo"到"立项"、"落地"的全过程。'
        : 'Real-World AI aims to help as many AI deployment-related partners as possible to get help and participate in co-creation.\n\n**Decision Makers** can understand the latest technology development trends and real-world industry application cases\n\n**Business Experts** can understand, reference, and practice the complete process of rapidly deploying AI in their own industries\n\n**Technical Developers** can understand and replicate the actual effects and best cases of applying the latest technologies in different scenarios\n\nEven if you don\'t understand algorithms or can\'t write code, you can find many low-threshold, zero/low-code practice solutions. We annotate the skills and knowledge required for different user roles in each solution, helping you understand how to quickly build your own AI team. Additionally, these solutions contain reference links for various stages that business and product teams can reference, helping you practice a project from "idea" to "Demo" to "project approval" and "deployment".',
    },
    {
      q: isChina ? '如何定义和评价"最佳实践"？' : 'How do you define and evaluate "best practices"?',
      a: isChina
        ? '作为长期做产业AI实践工作的团队，我们认为，真实世界AI的最佳实践首先应该从真实场景的目标出发，清晰定义AI落地能够为产业带来的价值，比如：安全合规、组织适配、系统适配这些基础要求，当然也有业务效果、实施成本、实施周期这些效果指标。\n\n在产业AI的实践中，我们会选择一些有代表性和通用性、并与常见系统接口较清晰的场景，定义这个场景的业务效果指标，并寻找最佳实践。在不同实践中，我们会通过开源开放的验证过程去评价各个指标。随着AGI的发展，未来我们也会更多尝试用AI解决这个问题——而目前的工作，就是为未来NL2Solution积累的宝贵数据。\n\n产业AI的应用场景足够长尾，其最佳实践和学术意义上的单一可测量指标SOTA不同，产业的SOTA更多还是要通过产业中的实践去验证。所以在初期，我们会邀请相关产业的合作专家和我们一起测试、选择最佳实践和验证的工作，做一个并非绝对正确，但尽力做到专业、公正和接地气的"裁判员"。在未来，我们同样期望通过AI和社群来做"裁判员"这件事情，也欢迎大家多提建议：）'
        : 'As a team long engaged in industrial AI practice, we believe that real-world AI best practices should start from real-world scenario goals, clearly defining the value AI deployment can bring to industry, including: compliance, organizational adaptation, system adaptation as basic requirements, of course, as well as business effectiveness, implementation cost, and implementation cycle as effectiveness metrics.\n\nIn industrial AI practice, we select scenarios with representativeness, universality, and clear common system interfaces, define business effectiveness metrics for each scenario, and seek best practices. In different practices, we evaluate various metrics through open verification processes. With AGI development, we will increasingly try to use AI to solve this problem—while our current work accumulates valuable data for future NL2Solution.\n\nIndustrial AI application scenarios are sufficiently long-tail, and their best practices differ from academically single measurable SOTA metrics; industrial SOTA must be verified through industrial practice. Therefore, in the early stages, we will invite relevant industrial experts to test, select best practices, and verification work with us, serving as "referees" that are not absolutely correct but strive to be professional, fair, and grounded. In the future, we also hope to use AI and the community to do "referee" work, and we welcome your suggestions.',
    },
    {
      q: isChina ? '我想参与建设Real-World AI，可以怎么做？' : 'How can I participate in building Real-World AI?',
      a: isChina
        ? '欢迎您的兴趣与意愿！目前有三种途径与我们合作：\n\n1. 您可以**投稿**，详见投稿指南\n\n2. 您如果有高度定制的需求或深度合作意愿，请**联系我们**\n\n3. 您也可以向我们提交**反馈建议与意见**，通过联系页面'
        : 'Welcome for your interest and willingness! There are currently three ways to cooperate with us:\n\n1. You can **submit** your solution, see the submission guide\n\n2. If you have highly customized requirements or deep cooperation intentions, please **contact us**\n\n3. You can also submit **feedback and suggestions** through the contact page',
    },
    {
      q: isChina ? '如何提交我的AI实践方案？' : 'How do I submit my AI practice?',
      a: isChina
        ? '您可以通过我们的"联系/社区"页面提交您的方案。请提供详细的方案描述、技术实现、性能数据和GitHub仓库链接。我们的团队会审核您的提交。'
        : 'You can submit your solution through our "Community" page. Please provide a detailed description, technical implementation, performance data, and GitHub repository link. Our team will review your submission.',
    },
    {
      q: isChina ? '评估标准是什么？' : 'What are the evaluation criteria?',
      a: isChina
        ? '我们从四个维度评估每个方案：质量（Quality）、效率（Efficiency）、成本（Cost）、可信度（Trust）。每个维度都有具体的评估指标和测试方法。'
        : 'We evaluate each solution across four dimensions: Quality, Efficiency, Cost, and Trust. Each dimension has specific metrics and testing methods.',
    },
    {
      q: isChina ? '"标准版"和"专家版"有什么区别？' : 'What\'s the difference between Standard and Expert versions?',
      a: isChina
        ? '标准版是免费的开源版本，包含核心功能和基础支持。专家版提供更高的准确率、私有化部署、专属技术支持和SLA保证，适合需要企业级服务的企业客户。'
        : 'The Standard version is a free open-source version with core features and basic support. The Expert version offers higher accuracy, private deployment, dedicated technical support, and SLA guarantees, suitable for enterprise customers requiring enterprise-grade services.',
    },
    {
      q: isChina ? 'RWAI是免费的吗？' : 'Is RWAI free?',
      a: isChina
        ? '是的，RWAI完全开源和免费。所有标准和最佳实践都是公开的，任何人都可以使用。如果您需要定制化服务或企业级支持，可以通过"联系专家"获取专家服务。'
        : 'Yes, RWAI is completely open-source and free. All standards and best practices are publicly available for anyone to use. If you need customized services or enterprise-grade support, you can contact our experts through the "Contact Expert" option.',
    },
    {
      q: isChina ? '如何获得技术支持？' : 'How can I get technical support?',
      a: isChina
        ? '对于标准版，您可以通过GitHub Issues或社区论坛获得支持。对于企业客户，我们提供24/7专属技术支持和SLA保证。请通过"联系/社区"页面联系我们。'
        : 'For the Standard version, you can get support through GitHub Issues or community forums. For enterprise customers, we provide 24/7 dedicated technical support and SLA guarantees. Please contact us through the "Community" page.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50/30 py-20 sm:py-28">
          <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <Badge variant="outline" className="mb-6 bg-white">
              <HelpCircle className="mr-2 h-4 w-4" />
              {isChina ? '常见问题' : 'FAQ'}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
              {t('faq.title')}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isChina
                ? '以下是关于RWAI的常见问题。如果您有其他问题，欢迎联系我们。'
                : 'Frequently asked questions about RWAI. If you have other questions, feel free to contact us.'}
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <AccordionItem
                    value={`item-${idx}`}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 shadow-card transition-all hover:shadow-md data-[state=open]:border-primary data-[state=open]:bg-primary-50/30"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary py-5 text-lg">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 pb-5 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl border-2 border-primary bg-gradient-to-br from-primary-50 to-white p-10 text-center shadow-card">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
              <HelpCircle className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isChina ? '还有其他问题？' : 'Still have questions?'}
            </h3>
            <p className="text-gray-700 mb-8 max-w-md mx-auto">
              {isChina
                ? '我们很乐意为您解答'
                : 'We\'re happy to help'}
            </p>
            <Button asChild size="lg" className="shadow-soft">
              <Link href={`/${locale}/contact`}>
                {isChina ? '联系我们' : 'Contact Us'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
