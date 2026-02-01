export interface Arena {
  id: string;
  title: { en: string; zh: string };
  description?: { en: string; zh: string };
  storyAchievement?: { en: string; zh: string }; // New: Story tag below title
  category: Category;
  industry: Industry;
  status: 'verified' | 'in-arena';
  metrics: {
    quality: number;
    efficiency: number;
    cost: number;
    trust: number;
  };
  detailedMetrics?: { // New: Scenario-specific metrics for radar hover
    [key: string]: {
      label: { en: string; zh: string };
      value: number;
    };
  };
  github?: {
    stars: number;
    forks: number;
    url: string;
  };
  blueprintId?: string;
  tags?: string[];
}

export type Category =
  | 'service'
  | 'management'
  | 'marketing'
  | 'risk-control'
  | 'operations';

export type Industry =
  | 'finance'
  | 'retail'
  | 'education'
  | 'healthcare'
  | 'energy'
  | 'manufacturing';

export interface Blueprint {
  id: string;
  arenaId: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  status: 'verified' | 'in-arena';
  demo?: {
    type: 'video' | 'interactive';
    url: string;
    thumbnail?: string;
  };
  businessCase: {
    roi: { en: string; zh: string };
    metrics: Array<{ label: { en: string; zh: string }; value: string; description?: { en: string; zh: string } }>;
  };
  gapAnalysis: {
    standard: {
      accuracy: string;
      deployment: string;
      support: string;
      customization: string;
      sla?: string;
    };
    expert: {
      accuracy: string;
      deployment: string;
      support: string;
      customization: string;
      sla?: string;
    };
  };
  technical: {
    repo: string;
    docs?: string;
    techStack: string[];
    team?: string;
  };
  implementation?: {
    overview: { en: string; zh: string };
    steps: Array<{
      title: { en: string; zh: string };
      description: { en: string; zh: string };
      duration?: string;
      techDetails?: string[];
    }>;
    architecture?: {
      en: string;
      zh: string;
    };
  };
  publishedAt: string;
  updatedAt: string;
}

// Sample arenas data - based on RWAI content
export const arenas: Arena[] = [
  {
    id: 'nl2sql-financial',
    title: {
      en: 'NL2SQL Financial Report Generation',
      zh: 'NL2SQL财报生成',
    },
    description: {
      en: 'Generate financial reports from natural language queries',
      zh: '通过自然语言查询生成财务报告',
    },
    storyAchievement: {
      en: 'Tsinghua Benchmark: 40% efficiency improvement over open-source baseline',
      zh: '清华基准测试：相比开源 Baseline 提升 40% 效率',
    },
    category: 'risk-control',
    industry: 'finance',
    status: 'verified',
    metrics: {
      quality: 95,
      efficiency: 88,
      cost: 92,
      trust: 90,
    },
    detailedMetrics: {
      sqlAccuracy: { label: { en: 'SQL Accuracy', zh: 'SQL准确率' }, value: 97 },
      responseTime: { label: { en: 'Response Time', zh: '响应时间' }, value: 95 },
      complexQuery: { label: { en: 'Complex Query Support', zh: '复杂查询支持' }, value: 92 },
    },
    github: {
      stars: 1234,
      forks: 56,
      url: 'https://github.com/rwai-arena/nl2sql-financial',
    },
    blueprintId: 'nl2sql-financial-v1',
  },
  {
    id: 'customer-support-qa',
    title: {
      en: 'Intelligent Customer Support Q&A',
      zh: '智能客服问答系统',
    },
    description: {
      en: 'AI-powered customer support automation',
      zh: 'AI驱动的客户服务自动化',
    },
    storyAchievement: {
      en: 'Handles 78% of queries without human intervention',
      zh: '自动处理78%的查询，无需人工干预',
    },
    category: 'service',
    industry: 'retail',
    status: 'verified',
    metrics: {
      quality: 92,
      efficiency: 94,
      cost: 89,
      trust: 91,
    },
    detailedMetrics: {
      resolutionRate: { label: { en: 'Resolution Rate', zh: '解决率' }, value: 78 },
      avgResponseTime: { label: { en: 'Avg Response Time', zh: '平均响应时间' }, value: 96 },
      satisfaction: { label: { en: 'User Satisfaction', zh: '用户满意度' }, value: 94 },
    },
    github: {
      stars: 892,
      forks: 43,
      url: 'https://github.com/rwai-arena/customer-support-qa',
    },
    blueprintId: 'customer-support-qa-v1',
  },
  {
    id: 'marketing-content-generation',
    title: {
      en: 'Marketing Content Generation',
      zh: '营销内容生成',
    },
    description: {
      en: 'Generate marketing copy at scale',
      zh: '大规模生成营销文案',
    },
    category: 'marketing',
    industry: 'retail',
    status: 'in-arena',
    metrics: {
      quality: 78,
      efficiency: 85,
      cost: 90,
      trust: 72,
    },
    github: {
      stars: 456,
      forks: 28,
      url: 'https://github.com/rwai-arena/marketing-content',
    },
  },
  {
    id: 'supply-chain-optimization',
    title: {
      en: 'Supply Chain Optimization',
      zh: '供应链优化',
    },
    description: {
      en: 'AI-driven supply chain forecasting',
      zh: 'AI驱动的供应链预测',
    },
    category: 'operations',
    industry: 'manufacturing',
    status: 'verified',
    metrics: {
      quality: 89,
      efficiency: 91,
      cost: 85,
      trust: 88,
    },
    github: {
      stars: 678,
      forks: 35,
      url: 'https://github.com/rwai-arena/supply-chain',
    },
    blueprintId: 'supply-chain-optimization-v1',
  },
  {
    id: 'children-education-fun',
    title: {
      en: 'Children\'s Education Fun Application',
      zh: '儿童教育趣味应用',
    },
    description: {
      en: 'Quick setup of a children\'s intellectual enlightenment fun application with AI-generated brain teasers',
      zh: '快速搭建儿童智力启蒙趣味性应用（以脑筋急转弯为例）',
    },
    category: 'service',
    industry: 'education',
    status: 'verified',
    metrics: {
      quality: 90,
      efficiency: 95,
      cost: 88,
      trust: 85,
    },
    tags: ['Education', 'NLP', 'Interactive'],
    blueprintId: 'children-education-fun-v1',
  },
  {
    id: 'education-tutoring',
    title: {
      en: 'AI Education Tutoring System',
      zh: 'AI教育辅导系统',
    },
    description: {
      en: 'Personalized learning assistant',
      zh: '个性化学习助手',
    },
    category: 'service',
    industry: 'education',
    status: 'in-arena',
    metrics: {
      quality: 82,
      efficiency: 87,
      cost: 93,
      trust: 79,
    },
    github: {
      stars: 534,
      forks: 31,
      url: 'https://github.com/rwai-arena/education-tutoring',
    },
    blueprintId: 'education-tutoring-v1',
  },
  {
    id: 'nl2sql-sota',
    title: {
      en: 'NL2SQL SOTA Model (On-Premise)',
      zh: 'NL2SQL SOTA模型（私有化部署）',
    },
    description: {
      en: 'State-of-the-art NL2SQL model with XiYanSQL-QwenCoder-32B for on-premise deployment',
      zh: '基于XiYanSQL-QwenCoder-32B的SOTA级NL2SQL模型，支持私有化部署',
    },
    category: 'operations',
    industry: 'finance',
    status: 'verified',
    metrics: {
      quality: 95,
      efficiency: 92,
      cost: 88,
      trust: 94,
    },
    tags: ['NL2SQL', 'SOTA', 'On-Premise', 'BIRD', 'Spider'],
    blueprintId: 'nl2sql-sota-v1',
  },
  {
    id: 'business-dashboard-website',
    title: {
      en: 'Business Dashboard & Website (2-Day Build)',
      zh: '业务看板及网站（两天搭建）',
    },
    description: {
      en: 'Rapid development of interactive web pages and business dashboards using Claude Code',
      zh: '使用Claude Code快速搭建交互式网页和业务看板',
    },
    category: 'operations',
    industry: 'retail',
    status: 'verified',
    metrics: {
      quality: 88,
      efficiency: 95,
      cost: 92,
      trust: 85,
    },
    tags: ['Claude Code', 'Rapid Development', 'Cloud', 'Dashboard'],
    blueprintId: 'business-dashboard-website-v1',
  },
  {
    id: 'enterprise-demo-video',
    title: {
      en: 'Enterprise Demo Video Generation (2.5-Day Build)',
      zh: '企业级演示视频生成（两天半搭建）',
    },
    description: {
      en: 'Automated demo video generation with ASR, TTS, and background music integration',
      zh: '集成ASR、TTS和背景音乐的自动化演示视频生成系统',
    },
    category: 'marketing',
    industry: 'retail',
    status: 'verified',
    metrics: {
      quality: 90,
      efficiency: 93,
      cost: 90,
      trust: 87,
    },
    tags: ['ASR', 'TTS', 'Video Generation', 'MCP Tools'],
    blueprintId: 'enterprise-demo-video-v1',
  },
  {
    id: 'intelligent-research-system',
    title: {
      en: 'Intelligent Research & Report Generation System',
      zh: '智能研究与报告生成系统',
    },
    description: {
      en: 'AI-powered research and report generation with DeepResearch Bench ranking #2',
      zh: 'AI驱动的研究与报告生成系统，DeepResearch榜排名第二',
    },
    category: 'service',
    industry: 'finance',
    status: 'verified',
    metrics: {
      quality: 92,
      efficiency: 96,
      cost: 89,
      trust: 90,
    },
    tags: ['DeepResearch', 'GLM 4.7', 'MiniMax-M2', 'Report Generation'],
    blueprintId: 'intelligent-research-system-v1',
  },
  {
    id: 'document-audit-risk-control',
    title: {
      en: 'Document Audit & Risk Control System (1-Week Build)',
      zh: '文档审核与风控系统（一周搭建）',
    },
    description: {
      en: 'AI-powered document parsing system for structure analysis, completeness checking, and risk assessment',
      zh: 'AI驱动的文档解析系统，支持结构化分析、完整性检查和风险评估',
    },
    category: 'risk-control',
    industry: 'finance',
    status: 'verified',
    metrics: {
      quality: 91,
      efficiency: 89,
      cost: 86,
      trust: 88,
    },
    tags: ['NLP', 'Agent', 'RAG', 'Document Parsing', 'Risk Assessment'],
    blueprintId: 'document-audit-risk-control-v1',
  },
  {
    id: 'smart-document-translation',
    title: {
      en: 'Smart Document Translation System (1-Week Build)',
      zh: '智能文档翻译系统（一周搭建）',
    },
    description: {
      en: 'One-week build of an intelligent document translation system using Gemini CLI and Gemini 3 Pro for batch text translation',
      zh: '一周使用Gemini CLI和Gemini 3 Pro构建的智能文档翻译系统，支持批量文本翻译',
    },
    category: 'service',
    industry: 'retail',
    status: 'verified',
    metrics: {
      quality: 92,
      efficiency: 94,
      cost: 90,
      trust: 88,
    },
    tags: ['LLM', 'NLP', 'Translation', 'MCP Tools'],
    blueprintId: 'smart-document-translation-v1',
  },
  {
    id: 'smart-contract-legal-review',
    title: {
      en: 'Smart Contract Legal Review System (1-Day Build)',
      zh: '智能合同法审系统（一天搭建）',
    },
    description: {
      en: 'One-day build of an intelligent contract legal review system with element extraction and cross-contract rule verification',
      zh: '一天构建的智能合同法审系统，支持要素抽取和跨合同规则校验',
    },
    category: 'risk-control',
    industry: 'finance',
    status: 'in-arena',
    metrics: {
      quality: 85,
      efficiency: 90,
      cost: 92,
      trust: 82,
    },
    tags: ['LLM', 'Agent', 'Data Governance', 'Legal Review'],
    blueprintId: 'smart-contract-legal-review-v1',
  },
  {
    id: 'object-detection-system',
    title: {
      en: 'Object Detection System (1-Week Build)',
      zh: '高精度通用目标检测系统（一周搭建）',
    },
    description: {
      en: 'One-week build of a high-precision general object detection system with data flow loop and self-evolution capabilities',
      zh: '一周构建的高精度通用目标检测系统，具备数据流闭环和自进化能力',
    },
    category: 'operations',
    industry: 'manufacturing',
    status: 'in-arena',
    metrics: {
      quality: 88,
      efficiency: 85,
      cost: 87,
      trust: 83,
    },
    tags: ['CV', 'YOLO 11', 'Triton', 'Data Governance'],
    blueprintId: 'object-detection-system-v1',
  },
];

// Sample blueprints data
export const blueprints: Record<string, Blueprint> = {
  'nl2sql-financial-v1': {
    id: 'nl2sql-financial-v1',
    arenaId: 'nl2sql-financial',
    title: {
      en: 'NL2SQL Financial Report Generation Blueprint',
      zh: 'NL2SQL财报生成蓝图',
    },
    description: {
      en: 'A production-ready solution for generating financial reports from natural language queries using state-of-the-art NL2SQL models.',
      zh: '使用最先进的NL2SQL模型从自然语言查询生成财务报告的生产级解决方案。',
    },
    status: 'verified',
    demo: {
      type: 'video',
      url: 'https://example.com/demo/nl2sql',
    },
    businessCase: {
      roi: {
        en: 'Reduce report generation time by 90%',
        zh: '报告生成时间减少90%',
      },
      metrics: [
        {
          label: { en: 'Accuracy', zh: '准确率' },
          value: '95%',
          description: { en: 'On complex financial queries', zh: '复杂财务查询准确率' },
        },
        {
          label: { en: 'Time Saved', zh: '节省时间' },
          value: '40 hrs/month',
          description: { en: 'Per financial analyst', zh: '每位财务分析师' },
        },
        {
          label: { en: 'Deployment Time', zh: '部署时间' },
          value: '1 week',
          description: { en: 'From zero to production', zh: '从零到生产环境' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '85%',
        deployment: 'Public Cloud (GCP/AWS)',
        support: 'Community Forum',
        customization: 'Code-level changes required',
      },
      expert: {
        accuracy: '95%+',
        deployment: 'Private VPC / On-Premise',
        support: '24/7 Dedicated Engineer',
        customization: 'Low-code Admin Panel',
        sla: '99.9% Uptime SLA',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/nl2sql-financial',
      docs: 'https://docs.rwai.org/nl2sql',
      techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Llama 3'],
      team: 'RWAI Core Team',
    },
    publishedAt: '2024-12-01',
    updatedAt: '2024-12-15',
  },
  'customer-support-qa-v1': {
    id: 'customer-support-qa-v1',
    arenaId: 'customer-support-qa',
    title: {
      en: 'Intelligent Customer Support Q&A Blueprint',
      zh: '智能客服问答系统蓝图',
    },
    description: {
      en: 'Enterprise-grade customer support automation with RAG-powered knowledge base.',
      zh: '基于RAG知识库的企业级客户服务自动化。',
    },
    status: 'verified',
    demo: {
      type: 'interactive',
      url: 'https://demo.rwai.org/customer-support',
    },
    businessCase: {
      roi: {
        en: 'Handle 80% of queries automatically',
        zh: '自动处理80%的查询',
      },
      metrics: [
        {
          label: { en: 'Response Time', zh: '响应时间' },
          value: '< 2 seconds',
          description: { en: 'Average query response', zh: '平均查询响应' },
        },
        {
          label: { en: 'Resolution Rate', zh: '解决率' },
          value: '78%',
          description: { en: 'Without human intervention', zh: '无需人工干预' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '82%',
        deployment: 'Docker / Localhost',
        support: 'GitHub Issues',
        customization: 'Requires development',
      },
      expert: {
        accuracy: '92%+',
        deployment: 'Private Cloud / On-Premise',
        support: 'Dedicated support team',
        customization: 'No-code configuration',
        sla: '99.5% Response Time SLA',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/customer-support-qa',
      techStack: ['Python', 'LangChain', 'Vector DB', 'GPT-4'],
    },
    publishedAt: '2024-11-15',
    updatedAt: '2024-12-01',
  },
  'supply-chain-optimization-v1': {
    id: 'supply-chain-optimization-v1',
    arenaId: 'supply-chain-optimization',
    title: {
      en: 'Supply Chain Optimization Blueprint',
      zh: '供应链优化蓝图',
    },
    description: {
      en: 'AI-powered demand forecasting and inventory optimization.',
      zh: 'AI驱动的需求预测和库存优化。',
    },
    status: 'verified',
    businessCase: {
      roi: {
        en: 'Reduce inventory costs by 25%',
        zh: '库存成本降低25%',
      },
      metrics: [
        {
          label: { en: 'Forecast Accuracy', zh: '预测准确率' },
          value: '89%',
        },
        {
          label: { en: 'Cost Reduction', zh: '成本降低' },
          value: '25%',
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '85%',
        deployment: 'Cloud-based',
        support: 'Community',
        customization: 'Manual configuration',
      },
      expert: {
        accuracy: '94%+',
        deployment: 'On-premise / Hybrid',
        support: 'Expert team',
        customization: 'Automated tuning',
        sla: '99% Availability',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/supply-chain',
      techStack: ['Python', 'TensorFlow', 'Apache Kafka', 'PostgreSQL'],
    },
    publishedAt: '2024-10-20',
    updatedAt: '2024-12-10',
  },
  'marketing-content-generation-v1': {
    id: 'marketing-content-generation-v1',
    arenaId: 'marketing-content-generation',
    title: {
      en: 'Marketing Content Generation Blueprint',
      zh: '营销内容生成蓝图',
    },
    description: {
      en: 'An AI-powered content generation system for creating marketing copy, social media posts, and promotional content at scale.',
      zh: '一个AI驱动的内容生成系统，用于大规模创建营销文案、社交媒体帖子和推广内容。',
    },
    status: 'in-arena',
    businessCase: {
      roi: {
        en: 'Produce 10x more content with same team',
        zh: '相同团队产出10倍内容',
      },
      metrics: [
        {
          label: { en: 'Content Output', zh: '内容产出' },
          value: '10x',
          description: { en: 'With same team size', zh: '相同团队规模' },
        },
        {
          label: { en: 'Quality Score', zh: '质量评分' },
          value: '8.2/10',
          description: { en: 'Human evaluation score', zh: '人工评估分数' },
        },
        {
          label: { en: 'Time per Article', zh: '单篇文章时间' },
          value: '5 min',
          description: { en: 'From research to draft', zh: '从研究到草稿' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '75%',
        deployment: 'Cloud API',
        support: 'Community',
        customization: 'Prompt engineering only',
      },
      expert: {
        accuracy: '92%+',
        deployment: 'Private Cloud / On-Premise',
        support: 'Marketing experts',
        customization: 'Brand voice training',
        sla: '99% Uptime Guarantee',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/marketing-content',
      techStack: ['Python', 'GPT-4', 'LangChain', 'Redis', 'Next.js'],
    },
    publishedAt: '2024-11-01',
    updatedAt: '2024-12-05',
  },
  'education-tutoring-v1': {
    id: 'education-tutoring-v1',
    arenaId: 'education-tutoring',
    title: {
      en: 'AI Education Tutoring System Blueprint',
      zh: 'AI教育辅导系统蓝图',
    },
    description: {
      en: 'An intelligent tutoring system that provides personalized learning experiences for students across various subjects.',
      zh: '一个智能辅导系统，为各学科的学生提供个性化学习体验。',
    },
    status: 'in-arena',
    businessCase: {
      roi: {
        en: 'Improve learning outcomes by 40%',
        zh: '学习效果提升40%',
      },
      metrics: [
        {
          label: { en: 'Student Engagement', zh: '学生参与度' },
          value: '85%',
          description: { en: 'Active daily participation', zh: '每日活跃参与' },
        },
        {
          label: { en: 'Learning Speed', zh: '学习速度' },
          value: '2.5x',
          description: { en: 'Faster than traditional methods', zh: '比传统方法更快' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '78%',
        deployment: 'Web Application',
        support: 'Email support',
        customization: 'Limited subject coverage',
      },
      expert: {
        accuracy: '95%+',
        deployment: 'School LMS Integration',
        support: 'Education specialists',
        customization: 'Full curriculum alignment',
        sla: '99.5% Uptime',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/education-tutoring',
      techStack: ['Python', 'OpenAI', 'Vector DB', 'React', 'Node.js'],
    },
    publishedAt: '2024-10-15',
    updatedAt: '2024-11-20',
  },
  'children-education-fun-v1': {
    id: 'children-education-fun-v1',
    arenaId: 'children-education-fun',
    title: {
      en: 'Children\'s Education Fun Application Blueprint',
      zh: '儿童教育趣味应用蓝图',
    },
    description: {
      en: 'A one-week deployment of an interactive children\'s education application using AI to generate brain teasers, riddles, and logic puzzles with continuous multi-turn interaction.',
      zh: '一周搭建的儿童教育趣味应用，使用AI生成脑筋急转弯、谜语和逻辑推理题，支持连续多轮互动。',
    },
    status: 'verified',
    businessCase: {
      roi: {
        en: 'One-week deployment with 90% accuracy',
        zh: '一周完成部署，准确率达90%',
      },
      metrics: [
        {
          label: { en: 'Response Latency', zh: '响应延迟' },
          value: '< 1s',
          description: { en: 'Real-time interaction', zh: '实时互动' },
        },
        {
          label: { en: 'Accuracy', zh: '准确率' },
          value: '90%',
          description: { en: 'Single-round answer accuracy', zh: '单轮回答准确率' },
        },
        {
          label: { en: 'Interaction Depth', zh: '交互深度' },
          value: '5 rounds',
          description: { en: 'Continuous conversation support', zh: '支持连续对话' },
        },
        {
          label: { en: 'Setup Time', zh: '搭建时间' },
          value: '1 week',
          description: { en: 'From concept to demo', zh: '从概念到演示' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '70%',
        deployment: 'Manual prompt engineering',
        support: 'Self-service setup',
        customization: 'Requires programming knowledge',
      },
      expert: {
        accuracy: '90%+',
        deployment: 'BISHENG workflow platform (Docker)',
        support: 'Complete verification documentation',
        customization: 'Low-code workflow editor',
        sla: '99% Uptime',
      },
    },
    technical: {
      repo: 'https://github.com/dataelement/bisheng',
      docs: 'https://gvxnc4ekbvn.feishu.cn/wiki/Csk3wFuMwiZk00kt8WJco88Wn5g',
      techStack: ['BISHENG', 'GLM-4.7', 'Docker', 'Ubuntu', 'Workflow'],
      team: 'Real-World AI (verified from original author zh)',
    },
    publishedAt: '2024-12-01',
    updatedAt: '2025-01-21',
  },
  'nl2sql-sota-v1': {
    id: 'nl2sql-sota-v1',
    arenaId: 'nl2sql-sota',
    title: {
      en: 'NL2SQL SOTA Model Blueprint (On-Premise)',
      zh: 'NL2SQL SOTA模型蓝图（私有化部署）',
    },
    description: {
      en: 'State-of-the-art NL2SQL implementation using XiYanSQL-QwenCoder-32B model with BIRD benchmark 75.63% and Spider benchmark 89.65% execution accuracy. Supports private deployment for data security.',
      zh: '使用XiYanSQL-QwenCoder-32B模型的SOTA级NL2SQL实现，BIRD基准测试75.63%执行准确率，Spider基准测试89.65%执行准确率。支持私有化部署保障数据安全。',
    },
    status: 'verified',
    businessCase: {
      roi: {
        en: 'Achieve SOTA performance with on-premise deployment',
        zh: '实现SOTA性能并支持私有化部署',
      },
      metrics: [
        {
          label: { en: 'BIRD Benchmark', zh: 'BIRD基准测试' },
          value: '75.63%',
          description: { en: 'Execution accuracy', zh: '执行准确率' },
        },
        {
          label: { en: 'Spider Benchmark', zh: 'Spider基准测试' },
          value: '89.65%',
          description: { en: 'Execution accuracy', zh: '执行准确率' },
        },
        {
          label: { en: 'Model Size', zh: '模型规模' },
          value: '32B',
          description: { en: 'XiYanSQL-QwenCoder', zh: '西岩SQL-Qwen编码器' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '60-70%',
        deployment: 'Public Cloud API',
        support: 'Community support',
        customization: 'Limited fine-tuning',
      },
      expert: {
        accuracy: '89.65%+',
        deployment: 'On-premise / Private Cloud',
        support: 'Enterprise support with model fine-tuning',
        customization: 'Full model customization',
        sla: '99.5% Uptime',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/nl2sql-sota',
      docs: 'https://gvxnc4ekbvn.feishu.cn/wiki/GGMKw7bP7iXmNpk88OxcsqCznmg',
      techStack: ['XiYanSQL-QwenCoder-32B', 'Python', 'PyTorch', 'SQL', 'On-Premise'],
      team: 'RWAI Core Team',
    },
    implementation: {
      overview: {
        en: 'This blueprint guides you through deploying a state-of-the-art NL2SQL model on-premise. You will learn how to set up the XiYanSQL-QwenCoder-32B model, integrate it with your database, and achieve SOTA performance on text-to-SQL tasks.',
        zh: '本蓝图指导您在私有环境部署SOTA级NL2SQL模型。您将学习如何设置XiYanSQL-QwenCoder-32B模型，将其与数据库集成，并在文本转SQL任务中实现SOTA性能。',
      },
      steps: [
        {
          title: { en: 'Environment Setup', zh: '环境准备' },
          description: {
            en: 'Prepare the on-premise environment with GPU support, install dependencies including PyTorch, transformers, and required SQL libraries.',
            zh: '准备支持GPU的私有环境，安装PyTorch、transformers及所需SQL库等依赖。',
          },
          duration: '0.5 day',
          techDetails: ['NVIDIA GPU with 24GB+ VRAM', 'Docker container setup', 'Python 3.10+ environment', 'CUDA 12.1'],
        },
        {
          title: { en: 'Model Deployment', zh: '模型部署' },
          description: {
            en: 'Deploy XiYanSQL-QwenCoder-32B model using vLLM for optimized inference. Configure model parameters and set up the API server.',
            zh: '使用vLLM部署XiYanSQL-QwenCoder-32B模型以优化推理性能。配置模型参数并设置API服务器。',
          },
          duration: '1 day',
          techDetails: ['vLLM inference engine', 'Model quantization (4-bit/8-bit)', 'RESTful API setup', 'Load balancing configuration'],
        },
        {
          title: { en: 'Database Integration', zh: '数据库集成' },
          description: {
            en: 'Connect the NL2SQL model to your target databases (MySQL, PostgreSQL, etc.). Implement schema extraction and prompt engineering for optimal SQL generation.',
            zh: '将NL2SQL模型连接到目标数据库（MySQL、PostgreSQL等）。实现schema提取和提示工程以优化SQL生成。',
          },
          duration: '1 day',
          techDetails: ['Database connector setup', 'Schema parsing and indexing', 'Few-shot prompt templates', 'SQL validation layer'],
        },
        {
          title: { en: 'Testing & Validation', zh: '测试与验证' },
          description: {
            en: 'Run benchmarks on BIRD and Spider datasets to validate performance. Fine-tune prompts and model parameters based on validation results.',
            zh: '在BIRD和Spider数据集上运行基准测试以验证性能。根据验证结果微调提示和模型参数。',
          },
          duration: '0.5 day',
          techDetails: ['BIRD benchmark evaluation', 'Spider benchmark evaluation', 'Error analysis', 'Performance optimization'],
        },
      ],
      architecture: {
        en: '## System Architecture\n\n1. **Frontend Layer**: Web interface for natural language query input\n2. **API Layer**: RESTful API server handling query requests\n3. **NL2SQL Engine**: XiYanSQL-QwenCoder-32B model for text-to-SQL conversion\n4. **Database Layer**: Target databases for SQL execution\n5. **Validation Layer**: SQL syntax checking and result validation\n\n## Data Flow\n\n1. User enters natural language query\n2. System extracts relevant database schema\n3. Query and schema are sent to NL2SQL model\n4. Model generates SQL query\n5. SQL is validated and executed on database\n6. Results are formatted and returned to user',
        zh: '## 系统架构\n\n1. **前端层**: 用于自然语言查询输入的Web界面\n2. **API层**: 处理查询请求的RESTful API服务器\n3. **NL2SQL引擎**: XiYanSQL-QwenCoder-32B模型用于文本转SQL转换\n4. **数据库层**: 执行SQL的目标数据库\n5. **验证层**: SQL语法检查和结果验证\n\n## 数据流\n\n1. 用户输入自然语言查询\n2. 系统提取相关数据库schema\n3. 查询和schema发送至NL2SQL模型\n4. 模型生成SQL查询\n5. SQL被验证并在数据库上执行\n6. 结果格式化并返回给用户',
      },
    },
    publishedAt: '2024-12-20',
    updatedAt: '2025-01-22',
  },
  'business-dashboard-website-v1': {
    id: 'business-dashboard-website-v1',
    arenaId: 'business-dashboard-website',
    title: {
      en: 'Business Dashboard & Website Blueprint (2-Day Build)',
      zh: '业务看板及网站蓝图（两天搭建）',
    },
    description: {
      en: 'A 2-day implementation using Claude Code to generate interactive web pages and business dashboards from text descriptions. Achieves 90% content completion and 80% accuracy with cloud deployment.',
      zh: '使用Claude Code在2天内实现的从文本描述生成交互式网页和业务看板的解决方案。实现90%内容完成率和80%准确率，支持云端部署。',
    },
    status: 'verified',
    businessCase: {
      roi: {
        en: 'Build production-ready dashboards in 2 days',
        zh: '2天内构建生产就绪的业务看板',
      },
      metrics: [
        {
          label: { en: 'Setup Time', zh: '搭建时间' },
          value: '2 days',
          description: { en: 'From concept to deployment', zh: '从概念到部署' },
        },
        {
          label: { en: 'Content Completion', zh: '内容完成率' },
          value: '90%',
          description: { en: 'Of required features', zh: '所需功能完成度' },
        },
        {
          label: { en: 'Accuracy Rate', zh: '准确率' },
          value: '80%',
          description: { en: 'Generated output quality', zh: '生成内容质量' },
        },
        {
          label: { en: 'Deployment', zh: '部署方式' },
          value: 'Cloud',
          description: { en: 'Cloud-based deployment', zh: '基于云端部署' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '70-75%',
        deployment: 'Manual coding (2-4 weeks)',
        support: 'Self-service documentation',
        customization: 'Requires development team',
      },
      expert: {
        accuracy: '80%+',
        deployment: 'Cloud with Claude Code agent',
        support: 'Complete workflow documentation',
        customization: 'Text-driven customization',
        sla: '99% Uptime',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/business-dashboard',
      docs: 'https://gvxnc4ekbvn.feishu.cn/wiki/CtjuwGhsIiE977kD7TLc4u0KnRe',
      techStack: ['Claude Code', 'React', 'Next.js', 'Cloud Deployment', 'AI Agents'],
      team: 'RWAI Core Team',
    },
    implementation: {
      overview: {
        en: 'This blueprint demonstrates how to use Claude Code to rapidly build interactive business dashboards and web pages from simple text descriptions. The entire development process is completed in 2 days with 90% content completion.',
        zh: '本蓝图展示如何使用Claude Code从简单的文本描述快速构建交互式业务看板和网页。整个开发过程在2天内完成，实现90%内容完成率。',
      },
      steps: [
        {
          title: { en: 'Project Setup', zh: '项目初始化' },
          description: {
            en: 'Initialize Next.js project with TypeScript and Tailwind CSS. Set up project structure and configure development environment.',
            zh: '使用TypeScript和Tailwind CSS初始化Next.js项目。设置项目结构并配置开发环境。',
          },
          duration: '0.5 day',
          techDetails: ['Next.js 15 setup', 'TypeScript configuration', 'Tailwind CSS integration', 'Git repository initialization'],
        },
        {
          title: { en: 'Component Development with Claude Code', zh: '使用Claude Code开发组件' },
          description: {
            en: 'Use Claude Code agent to generate React components from text descriptions. Iteratively refine components through natural language prompts.',
            zh: '使用Claude Code代理从文本描述生成React组件。通过自然语言提示迭代优化组件。',
          },
          duration: '1 day',
          techDetails: ['Claude Code agent setup', 'Component prompt engineering', 'Iterative refinement', 'Code review and validation'],
        },
        {
          title: { en: 'Dashboard Integration', zh: '看板集成' },
          description: {
            en: 'Integrate components into complete dashboard. Add data visualization, interactivity, and responsive design.',
            zh: '将组件集成到完整看板。添加数据可视化、交互性和响应式设计。',
          },
          duration: '0.5 day',
          techDetails: ['Data visualization libraries', 'Responsive design implementation', 'State management', 'API integration'],
        },
      ],
      architecture: {
        en: '## System Architecture\n\n1. **Development Environment**: Cloud-based IDE with Claude Code integration\n2. **AI Agent Layer**: Claude Code agent for code generation\n3. **Frontend Framework**: Next.js with React components\n4. **UI Layer**: Tailwind CSS for styling\n5. **Data Layer**: API integration for dynamic content\n\n## Development Workflow\n\n1. Describe desired component in natural language\n2. Claude Code generates initial React component code\n3. Review and refine through conversational prompts\n4. Test component functionality\n5. Integrate into dashboard layout\n6. Deploy to cloud platform',
        zh: '## 系统架构\n\n1. **开发环境**: 集成Claude Code的云端IDE\n2. **AI代理层**: Claude Code代理用于代码生成\n3. **前端框架**: Next.js与React组件\n4. **UI层**: Tailwind CSS样式\n5. **数据层**: API集成实现动态内容\n\n## 开发工作流\n\n1. 用自然语言描述所需组件\n2. Claude Code生成初始React组件代码\n3. 通过对话式提示审查和优化\n4. 测试组件功能\n5. 集成到看板布局\n6. 部署到云平台',
      },
    },
    publishedAt: '2024-12-15',
    updatedAt: '2025-01-20',
  },
  'enterprise-demo-video-v1': {
    id: 'enterprise-demo-video-v1',
    arenaId: 'enterprise-demo-video',
    title: {
      en: 'Enterprise Demo Video Generation Blueprint (2.5-Day Build)',
      zh: '企业级演示视频生成蓝图（两天半搭建）',
    },
    description: {
      en: 'A 2.5-day implementation of automated demo video generation system integrating ASR (Automatic Speech Recognition), TTS (Text-to-Speech), and background music generation with MCP tools integration.',
      zh: '集成ASR（自动语音识别）、TTS（文本转语音）和背景音乐生成的自动化演示视频生成系统，2.5天实现，集成MCP工具。',
    },
    status: 'verified',
    businessCase: {
      roi: {
        en: 'Create professional demo videos in 2.5 days',
        zh: '2.5天创建专业演示视频',
      },
      metrics: [
        {
          label: { en: 'Development Time', zh: '开发时间' },
          value: '2.5 days',
          description: { en: 'From concept to working system', zh: '从概念到可运行系统' },
        },
        {
          label: { en: 'ASR Performance', zh: 'ASR性能' },
          value: 'CER ≤5%',
          description: { en: 'Character Error Rate', zh: '字符错误率' },
        },
        {
          label: { en: 'TTS Quality', zh: 'TTS质量' },
          value: 'Acc ≥75%',
          description: { en: 'Accuracy score', zh: '准确度分数' },
        },
        {
          label: { en: 'Real-Time Factor', zh: '实时因子' },
          value: 'RTF ≤0.5',
          description: { en: 'Processing speed metric', zh: '处理速度指标' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: 'CER 10-15%',
        deployment: 'Manual video editing (1-2 weeks)',
        support: 'Basic tool documentation',
        customization: 'Requires professional video editors',
      },
      expert: {
        accuracy: 'CER ≤5%',
        deployment: 'Automated pipeline with MCP tools',
        support: 'Complete integration guide',
        customization: 'Multi-modal content generation',
        sla: '98% Uptime',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/demo-video-generation',
      docs: 'https://gvxnc4ekbvn.feishu.cn/wiki/Dkl8wQ6fBiE49Gk4XE2cTRc2nhD',
      techStack: ['ASR', 'TTS', 'MCP Tools', 'Video Processing', 'Audio Generation'],
      team: 'RWAI Core Team',
    },
    implementation: {
      overview: {
        en: 'This blueprint guides you through building an automated demo video generation system that integrates ASR, TTS, and background music generation. The system is built in 2.5 days with MCP tools integration.',
        zh: '本蓝图指导您构建集成ASR、TTS和背景音乐生成的自动化演示视频生成系统。系统在2.5天内构建完成，集成MCP工具。',
      },
      steps: [
        {
          title: { en: 'ASR Integration Setup', zh: 'ASR集成设置' },
          description: {
            en: 'Integrate Automatic Speech Recognition service to convert voice scripts to text. Configure ASR model for optimal character error rate (CER ≤5%).',
            zh: '集成自动语音识别服务将语音脚本转换为文本。配置ASR模型以实现最佳字符错误率（CER≤5%）。',
          },
          duration: '1 day',
          techDetails: ['ASR API integration', 'Audio preprocessing', 'CER optimization', 'Batch processing'],
        },
        {
          title: { en: 'TTS System Integration', zh: 'TTS系统集成' },
          description: {
            en: 'Integrate Text-to-Speech engine to convert scripts to natural voice audio. Configure voice parameters and optimize for accuracy (≥75%).',
            zh: '集成文本转语音引擎将脚本转换为自然语音音频。配置语音参数并优化准确度（≥75%）。',
          },
          duration: '1 day',
          techDetails: ['TTS API setup', 'Voice selection and tuning', 'Real-time factor optimization (RTF ≤0.5)', 'Audio post-processing'],
        },
        {
          title: { en: 'MCP Tools & Background Music', zh: 'MCP工具与背景音乐' },
          description: {
            en: 'Integrate MCP tools for extended functionality and add background music generation. Combine audio tracks and synchronize with video content.',
            zh: '集成MCP工具实现扩展功能，添加背景音乐生成。合并音轨并与视频内容同步。',
          },
          duration: '0.5 day',
          techDetails: ['MCP tool integration', 'Background music generation', 'Audio mixing', 'Video synchronization'],
        },
      ],
      architecture: {
        en: '## System Architecture\n\n1. **Input Layer**: Script text or voice input\n2. **ASR Layer**: Speech-to-text conversion (if voice input)\n3. **Processing Layer**: Script optimization and timing\n4. **TTS Layer**: Text-to-speech conversion with voice synthesis\n5. **Audio Layer**: Background music generation and mixing\n6. **MCP Layer**: External tool integration for enhanced features\n7. **Output Layer**: Final video production with synchronized audio\n\n## Processing Pipeline\n\n1. Input script (text or voice)\n2. ASR processes voice to text (if applicable)\n3. Script is analyzed for timing and emphasis\n4. TTS generates voice audio track\n5. Background music is generated/selected\n6. Audio tracks are mixed and synchronized\n7. Video is rendered with audio overlay',
        zh: '## 系统架构\n\n1. **输入层**: 脚本文本或语音输入\n2. **ASR层**: 语音转文本转换（如适用）\n3. **处理层**: 脚本优化和时序控制\n4. **TTS层**: 文本转语音转换与语音合成\n5. **音频层**: 背景音乐生成和混音\n6. **MCP层**: 外部工具集成实现增强功能\n7. **输出层**: 带同步音频的最终视频生成\n\n## 处理流程\n\n1. 输入脚本（文本或语音）\n2. ASR处理语音为文本（如适用）\n3. 分析脚本时序和重点\n4. TTS生成语音音轨\n5. 生成/选择背景音乐\n6. 混合并同步音轨\n7. 渲染带音频叠加的视频',
      },
    },
    publishedAt: '2024-12-10',
    updatedAt: '2025-01-19',
  },
  'intelligent-research-system-v1': {
    id: 'intelligent-research-system-v1',
    arenaId: 'intelligent-research-system',
    title: {
      en: 'Intelligent Research & Report Generation System Blueprint',
      zh: '智能研究与报告生成系统蓝图',
    },
    description: {
      en: 'AI-powered research and report generation system achieving DeepResearch Bench score of 51.86 (ranked #2). Reduces human labor by 95% with report generation time ≤15 minutes. Supports finance, consulting, public policy, marketing, and operations.',
      zh: 'AI驱动的研究与报告生成系统，DeepResearch基准测试得分51.86（排名第二）。减少95%人力，报告生成时间≤15分钟。支持金融、咨询、公共政策、营销和运营领域。',
    },
    status: 'verified',
    businessCase: {
      roi: {
        en: 'Reduce research labor by 95% with faster report generation',
        zh: '减少95%研究人力并加速报告生成',
      },
      metrics: [
        {
          label: { en: 'DeepResearch Score', zh: 'DeepResearch得分' },
          value: '51.86',
          description: { en: 'Ranked #2 on benchmark', zh: '基准测试排名第二' },
        },
        {
          label: { en: 'Labor Reduction', zh: '人力减少' },
          value: '95%',
          description: { en: 'Human effort saved', zh: '节省人力投入' },
        },
        {
          label: { en: 'Report Generation', zh: '报告生成时间' },
          value: '≤15 min',
          description: { en: 'From query to report', zh: '从查询到报告' },
        },
        {
          label: { en: 'Setup Time', zh: '搭建时间' },
          value: '1 week',
          description: { en: 'Enterprise deployment', zh: '企业级部署' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '40-45',
        deployment: 'Manual research (2-4 hours per report)',
        support: 'Basic research tools',
        customization: 'Limited domain coverage',
      },
      expert: {
        accuracy: '51.86+',
        deployment: 'GLM 4.7 + MiniMax-M2 + Claude Code agents',
        support: 'Multi-domain research capability',
        customization: 'Domain-specific fine-tuning',
        sla: '99.5% Uptime',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/intelligent-research',
      docs: 'https://gvxnc4ekbvn.feishu.cn/wiki/DbbUwFE8FiYjupki6uzcRqT0nEe',
      techStack: ['GLM 4.7', 'MiniMax-M2', 'Claude Code', 'RAG', 'Agent Framework'],
      team: 'RWAI Core Team',
    },
    implementation: {
      overview: {
        en: 'This blueprint guides you through building an intelligent research and report generation system that achieves DeepResearch Bench score of 51.86 (ranked #2). The system reduces human labor by 95% with report generation time ≤15 minutes.',
        zh: '本蓝图指导您构建智能研究与报告生成系统，DeepResearch基准测试得分51.86（排名第二）。系统减少95%人力，报告生成时间≤15分钟。',
      },
      steps: [
        {
          title: { en: 'Multi-Model Integration Setup', zh: '多模型集成设置' },
          description: {
            en: 'Set up GLM 4.7 and MiniMax-M2 models for research tasks. Configure model access and implement model selection strategy for different research domains.',
            zh: '设置GLM 4.7和MiniMax-M2模型用于研究任务。配置模型访问并实现不同研究领域的模型选择策略。',
          },
          duration: '2 days',
          techDetails: ['GLM 4.7 API integration', 'MiniMax-M2 API setup', 'Model routing logic', 'Domain-specific configuration'],
        },
        {
          title: { en: 'RAG System Development', zh: 'RAG系统开发' },
          description: {
            en: 'Implement Retrieval-Augmented Generation system for knowledge retrieval. Build vector database and configure retrieval strategies for different content types.',
            zh: '实现检索增强生成系统用于知识检索。构建向量数据库并配置不同内容类型的检索策略。',
          },
          duration: '2 days',
          techDetails: ['Vector database setup', 'Embedding model integration', 'Retrieval strategy optimization', 'Knowledge base construction'],
        },
        {
          title: { en: 'Claude Code Agent Integration', zh: 'Claude Code代理集成' },
          description: {
            en: 'Integrate Claude Code agents for automated research workflow. Implement agent chains for research planning, information gathering, and report generation.',
            zh: '集成Claude Code代理实现自动化研究工作流。实现代理链用于研究规划、信息收集和报告生成。',
          },
          duration: '2 days',
          techDetails: ['Claude Code agent setup', 'Research workflow orchestration', 'Agent chain design', 'Report template system'],
        },
        {
          title: { en: 'Testing & Benchmarking', zh: '测试与基准测试' },
          description: {
            en: 'Run DeepResearch benchmark tests to validate system performance. Optimize parameters to achieve target score of 51.86+.',
            zh: '运行DeepResearch基准测试以验证系统性能。优化参数以达到目标得分51.86+。',
          },
          duration: '1 day',
          techDetails: ['DeepResearch benchmark evaluation', 'Performance optimization', 'Quality validation', 'Report generation tuning'],
        },
      ],
      architecture: {
        en: '## System Architecture\n\n1. **Query Interface**: User input for research topics and requirements\n2. **Agent Orchestrator**: Claude Code agents coordinate research workflow\n3. **Model Selection Layer**: Routes tasks to GLM 4.7 or MiniMax-M2 based on domain\n4. **RAG Layer**: Retrieves relevant knowledge from vector database\n5. **Research Engine**: Multi-model system for information gathering and synthesis\n6. **Report Generator**: Automated report writing and formatting\n7. **Quality Validator**: Ensures report accuracy and completeness\n\n## Research Workflow\n\n1. User submits research query\n2. Agent analyzes requirements and plans research approach\n3. RAG retrieves relevant background knowledge\n4. Models perform multi-source research and data collection\n5. Information is synthesized and validated\n6. Report is generated with proper structure and citations\n7. Quality check ensures accuracy and completeness',
        zh: '## 系统架构\n\n1. **查询接口**: 用户输入研究主题和要求\n2. **代理编排器**: Claude Code代理协调研究工作流\n3. **模型选择层**: 基于领域将任务路由至GLM 4.7或MiniMax-M2\n4. **RAG层**: 从向量数据库检索相关知识\n5. **研究引擎**: 多模型系统用于信息收集和综合\n6. **报告生成器**: 自动化报告编写和格式化\n7. **质量验证器**: 确保报告准确性和完整性\n\n## 研究工作流\n\n1. 用户提交研究查询\n2. 代理分析要求并规划研究方法\n3. RAG检索相关背景知识\n4. 模型执行多源研究和数据收集\n5. 信息被综合和验证\n6. 生成具有适当结构和引用的报告\n7. 质量检查确保准确性和完整性',
      },
    },
    publishedAt: '2024-11-25',
    updatedAt: '2025-01-18',
  },
  'document-audit-risk-control-v1': {
    id: 'document-audit-risk-control-v1',
    arenaId: 'document-audit-risk-control',
    title: {
      en: 'Document Audit & Risk Control Blueprint (1-Week Build)',
      zh: '文档审核与风控蓝图（一周搭建）',
    },
    description: {
      en: 'One-week build of an intelligent document parsing system with structure analysis, completeness checking, and risk assessment capabilities using LangChain workflow and Unstructured.io.',
      zh: '一周构建集文档结构化、章节完整性检查、关键内容风险项评估能力于一体的文档解析系统，使用LangChain工作流和Unstructured.io。',
    },
    status: 'verified',
    businessCase: {
      roi: {
        en: 'Reduce document review time by 90% with AI automation',
        zh: 'AI自动化减少90%文档审核时间',
      },
      metrics: [
        {
          label: { en: 'Jaro-Winkler Similarity', zh: 'Jaro-Winkler相似度' },
          value: '≥ 0.95',
          description: { en: 'Field matching accuracy', zh: '字段匹配准确率' },
        },
        {
          label: { en: 'Ragas Faithfulness', zh: 'Ragas保真度' },
          value: '≥ 0.98',
          description: { en: 'Text summary quality', zh: '文本摘要质量' },
        },
        {
          label: { en: 'Setup Time', zh: '搭建时间' },
          value: '1 week',
          description: { en: 'From concept to deployment', zh: '从概念到部署' },
        },
        {
          label: { en: 'Processing Speed', zh: '处理速度' },
          value: '<30s',
          description: { en: 'Per document', zh: '单文档处理' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '70-80%',
        deployment: 'Manual review (3-5 hours per document)',
        support: 'Basic document tools',
        customization: 'Requires programming team',
      },
      expert: {
        accuracy: '95%+',
        deployment: 'LangChain workflow with Unstructured.io',
        support: 'Complete verification documentation',
        customization: 'Domain-specific rule configuration',
        sla: '99% Uptime',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/document-audit',
      docs: 'https://gvxnc4ekbvn.feishu.cn/wiki/PQ6MwPExLi3v2Vkn3DAckYxGn8b',
      techStack: ['LangChain', 'Unstructured.io', 'NLP', 'Agent', 'RAG'],
      team: 'RWAI Core Team',
    },
    implementation: {
      overview: {
        en: 'This blueprint guides you through building an intelligent document parsing system with structure analysis, completeness checking, and risk assessment. Built in 1 week using LangChain workflow and Unstructured.io.',
        zh: '本蓝图指导您构建集文档结构化、章节完整性检查、关键内容风险项评估能力于一体的文档解析系统。使用LangChain工作流和Unstructured.io在1周内构建。',
      },
      steps: [
        {
          title: { en: 'Document Parsing Setup', zh: '文档解析设置' },
          description: {
            en: 'Set up Unstructured.io for document parsing. Configure parsers for different document formats (PDF, DOCX, TXT) and implement structure extraction.',
            zh: '设置Unstructured.io用于文档解析。配置不同文档格式的解析器（PDF、DOCX、TXT）并实现结构提取。',
          },
          duration: '2 days',
          techDetails: ['Unstructured.io integration', 'Multi-format parser setup', 'Document structure extraction', 'Table and figure parsing'],
        },
        {
          title: { en: 'Completeness Checking Engine', zh: '完整性检查引擎' },
          description: {
            en: 'Implement completeness checking logic using LangChain workflow. Define validation rules for document sections and required fields.',
            zh: '使用LangChain工作流实现完整性检查逻辑。定义文档章节和必填字段的验证规则。',
          },
          duration: '2 days',
          techDetails: ['LangChain workflow setup', 'Validation rule engine', 'Section completeness detection', 'Field matching algorithms'],
        },
        {
          title: { en: 'Risk Assessment System', zh: '风险评估系统' },
          description: {
            en: 'Build risk assessment module with NLP-based content analysis. Implement Jaro-Winkler similarity matching and Ragas faithfulness scoring.',
            zh: '构建基于NLP内容分析的风险评估模块。实现Jaro-Winkler相似度匹配和Ragas保真度评分。',
          },
          duration: '2 days',
          techDetails: ['NLP model integration', 'Jaro-Winkler similarity algorithm', 'Ragas metrics implementation', 'Risk rule configuration'],
        },
        {
          title: { en: 'Testing & Validation', zh: '测试与验证' },
          description: {
            en: 'Validate system with test documents. Measure Jaro-Winkler similarity (≥0.95) and Ragas faithfulness (≥0.98). Optimize processing speed to <30s per document.',
            zh: '使用测试文档验证系统。测量Jaro-Winkler相似度（≥0.95）和Ragas保真度（≥0.98）。优化处理速度至每文档<30秒。',
          },
          duration: '1 day',
          techDetails: ['Accuracy validation', 'Performance testing', 'False positive analysis', 'Processing optimization'],
        },
      ],
      architecture: {
        en: '## System Architecture\n\n1. **Input Layer**: Document upload interface (PDF, DOCX, TXT)\n2. **Parsing Layer**: Unstructured.io for multi-format document parsing\n3. **Structure Analysis**: Document structure and section extraction\n4. **Completeness Engine**: LangChain workflow for validation checks\n5. **Risk Assessment**: NLP-based content analysis and scoring\n6. **Reporting Layer**: Audit results and risk reports\n7. **API Layer**: RESTful API for system integration\n\n## Processing Pipeline\n\n1. Document is uploaded to the system\n2. Unstructured.io parses document structure and content\n3. Completeness engine validates required sections and fields\n4. Risk assessment analyzes content for potential issues\n5. Jaro-Winkler similarity checks field matching accuracy\n6. Ragas evaluates summary faithfulness\n7. Comprehensive audit report is generated\n8. Results are returned via API or dashboard',
        zh: '## 系统架构\n\n1. **输入层**: 文档上传接口（PDF、DOCX、TXT）\n2. **解析层**: Unstructured.io多格式文档解析\n3. **结构分析**: 文档结构和章节提取\n4. **完整性引擎**: LangChain工作流进行验证检查\n5. **风险评估**: 基于NLP的内容分析和评分\n6. **报告层**: 审核结果和风险报告\n7. **API层**: RESTful API用于系统集成\n\n## 处理流程\n\n1. 文档上传至系统\n2. Unstructured.io解析文档结构和内容\n3. 完整性引擎验证必填章节和字段\n4. 风险评估分析内容是否存在问题\n5. Jaro-Winkler相似度检查字段匹配准确率\n6. Ragas评估摘要保真度\n7. 生成全面审核报告\n8. 通过API或仪表板返回结果',
      },
    },
    publishedAt: '2024-12-05',
    updatedAt: '2025-01-22',
  },
  'smart-document-translation-v1': {
    id: 'smart-document-translation-v1',
    arenaId: 'smart-document-translation',
    title: {
      en: 'Smart Document Translation System Blueprint (1-Week Build)',
      zh: '智能文档翻译系统蓝图（一周搭建）',
    },
    description: {
      en: 'One-week build of an intelligent document translation system using Gemini CLI and Gemini 3 Pro for batch text translation with MCP tools integration.',
      zh: '一周使用Gemini CLI和Gemini 3 Pro构建的智能文档翻译系统，支持批量文本翻译，集成MCP工具。',
    },
    status: 'verified',
    businessCase: {
      roi: {
        en: 'Reduce translation time by 90% with AI automation',
        zh: 'AI自动化减少90%翻译时间',
      },
      metrics: [
        {
          label: { en: 'Translation Accuracy', zh: '翻译准确率' },
          value: '92%+',
          description: { en: 'Context-aware translation', zh: '上下文感知翻译' },
        },
        {
          label: { en: 'Processing Speed', zh: '处理速度' },
          value: '1000+ words/min',
          description: { en: 'Batch translation capability', zh: '批量翻译能力' },
        },
        {
          label: { en: 'Setup Time', zh: '搭建时间' },
          value: '1 week',
          description: { en: 'From zero to production', zh: '从零到生产环境' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '85%',
        deployment: 'Manual translation or basic tools',
        support: 'Limited language support',
        customization: 'Template-based only',
      },
      expert: {
        accuracy: '92%+',
        deployment: 'Gemini 3 Pro with CLI',
        support: 'Multi-language support',
        customization: 'Domain-specific glossaries',
        sla: '99% Uptime',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/document-translation',
      docs: 'https://gvxnc4ekbvn.feishu.cn/wiki/QHljw6HhbiceMPkBC49cmvzNnXf',
      techStack: ['Gemini CLI', 'Gemini 3 Pro', 'MCP Tools', 'Translation Pipeline'],
      team: 'RWAI Core Team',
    },
    publishedAt: '2024-12-20',
    updatedAt: '2025-01-23',
  },
  'smart-contract-legal-review-v1': {
    id: 'smart-contract-legal-review-v1',
    arenaId: 'smart-contract-legal-review',
    title: {
      en: 'Smart Contract Legal Review Blueprint (1-Day Build)',
      zh: '智能合同法审系统蓝图（一天搭建）',
    },
    description: {
      en: 'One-day build of an intelligent contract legal review system with element extraction, cross-contract rule verification, and traceability using BISHENG.',
      zh: '一天使用BISHENG构建的智能合同法审系统，支持要素抽取、跨合同规则校验、可配置与溯源。',
    },
    status: 'in-arena',
    businessCase: {
      roi: {
        en: 'Reduce legal review time by 85% with AI automation',
        zh: 'AI自动化减少85%法审时间',
      },
      metrics: [
        {
          label: { en: 'Element Extraction', zh: '要素抽取' },
          value: '95%+',
          description: { en: 'Key clause identification', zh: '关键条款识别' },
        },
        {
          label: { en: 'Cross-Contract Check', zh: '跨合同检查' },
          value: '90%+',
          description: { en: 'Consistency verification', zh: '一致性验证' },
        },
        {
          label: { en: 'Setup Time', zh: '搭建时间' },
          value: '1 day',
          description: { en: 'Low-code configuration', zh: '低代码配置' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '70-75%',
        deployment: 'Manual review (2-4 hours per contract)',
        support: 'No rule verification',
        customization: 'Requires legal team',
      },
      expert: {
        accuracy: '90%+',
        deployment: 'BISHENG low-code platform',
        support: 'Configurable rule engine',
        customization: 'Domain-specific templates',
        sla: '98% Uptime',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/contract-legal-review',
      docs: 'https://gvxnc4ekbvn.feishu.cn/wiki/NfpfwmK16iXEDtkznIscn549nEb',
      techStack: ['BISHENG', 'LLM', 'Agent', 'Data Governance'],
      team: 'RWAI Core Team',
    },
    publishedAt: '2024-12-25',
    updatedAt: '2025-01-24',
  },
  'object-detection-system-v1': {
    id: 'object-detection-system-v1',
    arenaId: 'object-detection-system',
    title: {
      en: 'Object Detection System Blueprint (1-Week Build)',
      zh: '高精度通用目标检测系统蓝图（一周搭建）',
    },
    description: {
      en: 'One-week build of a high-precision general object detection system with data flow loop, self-evolution capabilities, and Triton inference server.',
      zh: '一周构建的高精度通用目标检测系统，具备数据流闭环、自进化能力和Triton推理服务器。',
    },
    status: 'in-arena',
    businessCase: {
      roi: {
        en: 'Achieve production-grade object detection in 1 week',
        zh: '1周内达到生产级目标检测',
      },
      metrics: [
        {
          label: { en: 'Detection Accuracy', zh: '检测准确率' },
          value: '88%+',
          description: { en: 'mAP on custom datasets', zh: '自定义数据集mAP' },
        },
        {
          label: { en: 'Inference Speed', zh: '推理速度' },
          value: '<50ms',
          description: { en: 'Per image on GPU', zh: 'GPU单图推理' },
        },
        {
          label: { en: 'Setup Time', zh: '搭建时间' },
          value: '1 week',
          description: { en: 'End-to-end deployment', zh: '端到端部署' },
        },
      ],
    },
    gapAnalysis: {
      standard: {
        accuracy: '75-80%',
        deployment: 'Basic YOLO models (2-3 weeks)',
        support: 'Limited model optimization',
        customization: 'Requires ML team',
      },
      expert: {
        accuracy: '88%+',
        deployment: 'YOLO 11 + Triton + Perf Analyzer',
        support: 'Complete model optimization pipeline',
        customization: 'Domain-specific fine-tuning',
        sla: '99% Availability',
      },
    },
    technical: {
      repo: 'https://github.com/rwai-arena/object-detection',
      docs: 'https://gvxnc4ekbvn.feishu.cn/wiki/OfMfwwUxMic5Qkkul8GcaA5En4d',
      techStack: ['YOLO 11', 'Triton', 'Perf Analyzer', 'CV', 'Data Governance'],
      team: 'RWAI Core Team',
    },
    publishedAt: '2024-12-28',
    updatedAt: '2025-01-25',
  },
};

export const categories: { id: Category; name: { en: string; zh: string }; icon: string }[] = [
  { id: 'service', name: { en: 'Customer Support', zh: '服务类' }, icon: 'Headphones' },
  { id: 'management', name: { en: 'Management', zh: '管理类' }, icon: 'Settings' },
  { id: 'marketing', name: { en: 'Marketing', zh: '营销类' }, icon: 'Megaphone' },
  { id: 'risk-control', name: { en: 'Risk Control', zh: '风控类' }, icon: 'Shield' },
  { id: 'operations', name: { en: 'Operations', zh: '运营类' }, icon: 'Cog' },
];

export const industries: { id: Industry; name: { en: string; zh: string }; icon: string }[] = [
  { id: 'finance', name: { en: 'Finance', zh: '金融' }, icon: 'Building' },
  { id: 'retail', name: { en: 'Retail', zh: '零售' }, icon: 'ShoppingCart' },
  { id: 'education', name: { en: 'Education', zh: '教育' }, icon: 'GraduationCap' },
  { id: 'healthcare', name: { en: 'Healthcare', zh: '医疗' }, icon: 'Stethoscope' },
  { id: 'energy', name: { en: 'Energy', zh: '能源' }, icon: 'Zap' },
  { id: 'manufacturing', name: { en: 'Manufacturing', zh: '制造' }, icon: 'Wrench' },
];
