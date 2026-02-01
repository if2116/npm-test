'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Twitter, Mail, MessageCircle, Users, Send, Award } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import React from 'react';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const locale = useLocale();
  const isChina = locale === 'zh';
  const t = useTranslations();

  const communityLinks = [
    {
      name: 'GitHub',
      description: isChina ? '查看源代码，提交问题' : 'View source code, submit issues',
      icon: Github,
      href: 'https://github.com/rwai-arena',
      color: 'hover:bg-gray-900',
      bgColor: 'bg-gray-50',
      iconBg: 'bg-gray-100',
    },
    {
      name: 'Twitter',
      description: isChina ? '获取最新动态' : 'Follow for updates',
      icon: Twitter,
      href: 'https://twitter.com/rwai_arena',
      color: 'hover:bg-blue-500',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
    },
    {
      name: 'Discord',
      description: isChina ? '加入社区讨论' : 'Join the community',
      icon: MessageCircle,
      href: 'https://discord.gg/rwai',
      color: 'hover:bg-indigo-500',
      bgColor: 'bg-indigo-50',
      iconBg: 'bg-indigo-100',
    },
    {
      name: 'Email',
      description: 'contact@rwai.org',
      icon: Mail,
      href: 'mailto:contact@rwai.org',
      color: 'hover:bg-primary',
      bgColor: 'bg-primary-50',
      iconBg: 'bg-primary-100',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert(isChina ? '感谢您的留言！我们会尽快回复。' : 'Thank you for your message! We\'ll respond soon.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50/30 py-20 sm:py-28">
          <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <Badge variant="outline" className="mb-6 bg-white">
              <Users className="mr-2 h-4 w-4" />
              {isChina ? '联系与社区' : 'Contact & Community'}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
              {isChina ? '联系我们' : 'Get in Touch'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isChina
                ? '加入RWAI社区，或联系我们获取专家服务'
                : 'Join the RWAI community or contact us for expert services'}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Community Links */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {isChina ? '社区链接' : 'Community Links'}
                </h2>
              </div>
              <div className="grid gap-4">
                {communityLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`group flex items-center gap-4 rounded-2xl border border-gray-200 ${link.bgColor} p-6 transition-all hover:shadow-lg hover:-translate-y-0.5`}
                    >
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${link.iconBg} ${link.color} text-gray-700 transition-all group-hover:scale-110 group-hover:text-white`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors text-lg">
                          {link.name}
                        </h3>
                        <p className="text-sm text-gray-600">{link.description}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Send className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {isChina ? '发送消息' : 'Send us a message'}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-card">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      {isChina ? '姓名' : 'Name'} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder={isChina ? '您的姓名' : 'Your name'}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      {isChina ? '主题' : 'Subject'}
                    </label>
                    <select
                      id="subject"
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      <option value="">
                        {isChina ? '选择主题' : 'Select a subject'}
                      </option>
                      <option value="general">
                        {isChina ? '一般咨询' : 'General Inquiry'}
                      </option>
                      <option value="expert">
                        {isChina ? '专家服务咨询' : 'Expert Services'}
                      </option>
                      <option value="submission">
                        {isChina ? '提交方案' : 'Submit a Solution'}
                      </option>
                      <option value="partnership">
                        {isChina ? '合作咨询' : 'Partnership'}
                      </option>
                      <option value="other">
                        {isChina ? '其他' : 'Other'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      {isChina ? '消息' : 'Message'} *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder={isChina ? '请告诉我们您的需求...' : 'Tell us about your needs...'}
                    />
                  </div>

                  <Button type="submit" className="w-full shadow-soft" size="lg">
                    <Send className="mr-2 h-5 w-5" />
                    {isChina ? '发送消息' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* China-specific CTA */}
          {isChina && (
            <div className="mt-16 rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-white p-10 text-center shadow-card">
              <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2 text-sm font-bold text-white mb-6 shadow-sm">
                <Award className="mr-2 h-4 w-4" />
                {isChina ? '企业服务' : 'Enterprise Services'}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {isChina ? '需要专家部署服务？' : 'Need Expert Deployment Services?'}
              </h3>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
                {isChina
                  ? '我们的专家团队可以为您提供定制化的AI解决方案，包括私有化部署、模型微调、技术支持等服务。'
                  : 'Our expert team can provide customized AI solutions, including private deployment, model fine-tuning, and technical support.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="shadow-soft">
                  {isChina ? '获取咨询' : 'Get a Consultation'}
                </Button>
                <Button size="lg" variant="outline">
                  {isChina ? '查看案例' : 'View Case Studies'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
