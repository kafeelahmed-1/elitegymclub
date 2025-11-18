import { motion } from 'framer-motion';
import { Target, Users, Award, Zap, Heart, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const stats = [
    { value: '10K+', label: 'Active Members' },
    { value: '50+', label: 'Expert Trainers' },
    { value: '15+', label: 'Years of Excellence' },
    { value: '98%', label: 'Success Rate' },
  ];

  const values = [
    {
      icon: <Target size={32} />,
      title: 'Results-Driven',
      description: 'We focus on measurable outcomes and proven methodologies to ensure every member achieves their fitness goals.',
    },
    {
      icon: <Users size={32} />,
      title: 'Community First',
      description: 'Building a supportive environment where members motivate and inspire each other on their fitness journey.',
    },
    {
      icon: <Award size={32} />,
      title: 'Excellence',
      description: 'Premium equipment, certified trainers, and world-class facilities designed for optimal performance.',
    },
    {
      icon: <Zap size={32} />,
      title: 'Innovation',
      description: 'Cutting-edge training techniques and technology to keep you ahead in your fitness transformation.',
    },
    {
      icon: <Heart size={32} />,
      title: 'Holistic Wellness',
      description: 'Beyond physical fitness, we care about your mental health, nutrition, and overall wellbeing.',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Continuous Growth',
      description: 'Evolving programs and personalized coaching to ensure you never plateau on your fitness journey.',
    },
  ];

  return (
    <div className="min-h-screen bg-gym-darker">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About EliteFit"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gym-darker via-gym-darker/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-semibold">
                About EliteFit
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-gym-light mb-6 leading-tight">
              Where Champions <br />
              <span className="text-gradient">Are Made</span>
            </h1>

            <p className="text-xl text-gym-gray max-w-3xl mx-auto">
              For over 15 years, EliteFit has been the premier destination for fitness transformation. 
              We combine world-class facilities, expert coaching, and a passionate community to help you 
              become the best version of yourself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gym-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-heading font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-gym-gray">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-b from-gym-dark to-gym-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-heading font-bold text-gym-light mb-6">
                Our <span className="text-gradient">Mission</span>
              </h2>
              <p className="text-gym-gray text-lg leading-relaxed mb-6">
                At EliteFit, we believe fitness is more than just physical transformation—it's a journey 
                of self-discovery, discipline, and empowerment. Our mission is to provide every member 
                with the tools, knowledge, and support they need to achieve extraordinary results.
              </p>
              <p className="text-gym-gray text-lg leading-relaxed mb-6">
                We're not just a gym; we're a community of driven individuals pushing boundaries and 
                redefining what's possible. From beginners taking their first steps to elite athletes 
                pushing peak performance, everyone finds their place at EliteFit.
              </p>
              <p className="text-gym-gray text-lg leading-relaxed">
                Join us and discover why thousands have chosen EliteFit as their partner in transformation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-hard">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661963869671-b11c70e16e46?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="EliteFit Gym"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gym-darker via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gym-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-gym-light mb-4">
              Our <span className="text-gradient">Core Values</span>
            </h2>
            <p className="text-xl text-gym-gray max-w-2xl mx-auto">
              The principles that drive everything we do at EliteFit
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gym-dark/50 backdrop-blur-sm border border-gym-gray/20 rounded-2xl p-8 hover:border-accent/50 transition-all duration-300 shadow-soft hover:shadow-glow"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-gym-light mb-4">
                  {value.title}
                </h3>
                <p className="text-gym-gray leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gym-darker to-gym-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-gym-light mb-6">
              Ready to Start Your <span className="text-gradient">Transformation?</span>
            </h2>
            <p className="text-xl text-gym-gray mb-8">
              Join thousands of members who have already transformed their lives at EliteFit.
            </p>
            <motion.a
              href="/#membership"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-accent hover:bg-accent/90 text-gym-dark font-bold px-12 py-4 text-lg rounded-lg shadow-glow transition-colors"
            >
              View Membership Plans
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
