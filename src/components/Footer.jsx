import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const links = [
    {
      title: 'Company',
      items: ['About', 'Careers', 'Blog', 'Pricing']
    },
    {
      title: 'Resources',
      items: ['Guides', 'Help Center', 'API Status', 'Events']
    },
    {
      title: 'Legal',
      items: ['Privacy', 'Terms', 'Cookie Policy', 'Compliance']
    }
  ];

  return (
    <motion.footer 
      className="bg-gray-900 text-white pt-16 pb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">DevCharles</h3>
            <p className="text-gray-400 mb-6">
              Making property rental simple and accessible for everyone.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, name: 'Facebook' },
                { icon: Twitter, name: 'Twitter' },
                { icon: Instagram, name: 'Instagram' },
                { icon: Linkedin, name: 'LinkedIn' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {links.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold text-white mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DevCharles. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;