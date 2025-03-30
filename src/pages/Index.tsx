
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, GraduationCap, Briefcase, MapPin, FileText } from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import FeatureSection from "@/components/FeatureSection";
import CTA from "@/components/CTA";
import Stats from "@/components/Stats";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Immigration",
      description: "Accompagnement personnalisé pour toutes vos démarches d'immigration et d'intégration dans votre pays d'accueil.",
      icon: <MapPin size={24} />,
      link: "/services/immigration"
    },
    {
      title: "Formation",
      description: "Création de CV et lettres de motivation adaptés aux standards professionnels avec des modèles personnalisés.",
      icon: <FileText size={24} />,
      link: "/services/formation"
    },
    {
      title: "Coaching",
      description: "Préparation aux entretiens d'embauche et développement des compétences professionnelles.",
      icon: <Users size={24} />,
      link: "/services/coaching"
    },
    {
      title: "Orientation Professionnelle",
      description: "Conseil personnalisé pour orienter votre carrière selon vos compétences et le marché du travail.",
      icon: <GraduationCap size={24} />,
      link: "/services/orientation"
    },
    {
      title: "Recrutement",
      description: "Accès aux offres d'emploi et mise en relation avec des entreprises qui recrutent dans votre domaine.",
      icon: <Briefcase size={24} />,
      link: "/services/recrutement"
    }
  ];

  const featuresImmigration = [
    {
      icon: <FileText size={24} />,
      title: "Préparation du dossier",
      description: "Nous vous guidons dans la préparation et la vérification de tous les documents nécessaires pour votre dossier d'immigration."
    },
    {
      icon: <MapPin size={24} />,
      title: "Suivi des procédures",
      description: "Bénéficiez d'un suivi personnalisé de votre dossier avec des mises à jour régulières sur l'avancement de vos démarches."
    },
    {
      icon: <Users size={24} />,
      title: "Intégration locale",
      description: "Nous vous aidons à vous intégrer dans votre pays d'accueil grâce à des conseils culturels et administratifs."
    }
  ];

  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Immigrée au Canada",
      testimonial: "Grâce à MigraPro, mon processus d'immigration au Canada s'est déroulé sans accroc. Leur équipe m'a accompagnée à chaque étape et je suis maintenant installée à Montréal avec un emploi stable.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200"
    },
    {
      name: "Thomas Dubois",
      role: "Développeur Web",
      testimonial: "Le coaching professionnel de MigraPro a transformé ma carrière. J'ai gagné en confiance lors des entretiens et j'ai décroché un poste dans une entreprise internationale.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200"
    },
    {
      name: "Amina Benhaddou",
      role: "Ingénieure",
      testimonial: "Leur service de création de CV a fait toute la différence dans ma recherche d'emploi. Mon profil est désormais beaucoup plus visible auprès des recruteurs.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200"
    }
  ];

  const stats = [
    { value: "10k+", label: "Clients accompagnés" },
    { value: "95%", label: "Taux de satisfaction" },
    { value: "85%", label: "Dossiers acceptés" },
    { value: "30+", label: "Pays d'expertise" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <Hero
        title="Votre partenaire pour un nouveau départ"
        subtitle="Nous vous accompagnons dans toutes vos démarches d'immigration, de formation et d'intégration professionnelle."
        ctaText="Tester mon éligibilité"
        ctaLink="/eligibility"
        secondaryCtaText="Nos services"
        secondaryCtaLink="/services"
        imageSrc="https://images.unsplash.com/photo-1524569970261-f3b491d7933b?auto=format&fit=crop&w=2000&q=80"
      />

      {/* Services section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-lg text-gray-600">
              Découvrez notre gamme complète de services conçus pour vous accompagner dans votre projet d'immigration et de développement professionnel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature section - Immigration */}
      <FeatureSection
        title="Immigration simplifiée"
        subtitle="Notre équipe d'experts vous guide à travers le processus d'immigration complexe, en vous offrant un accompagnement sur mesure pour concrétiser votre projet de vie à l'étranger."
        features={featuresImmigration}
        imageSrc="https://images.unsplash.com/photo-1529386084422-5aded8767727?auto=format&fit=crop&w=1000&q=80"
      />

      {/* Stats section */}
      <Stats
        title="Notre impact en chiffres"
        description="Des résultats qui parlent d'eux-mêmes. Découvrez comment nous avons aidé des milliers de personnes à réaliser leurs projets d'immigration et d'évolution professionnelle."
        stats={stats}
      />

      {/* Testimonials section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ce que nos clients disent</h2>
            <p className="text-lg text-gray-600">
              Découvrez les témoignages de personnes qui ont fait confiance à nos services et ont réussi leur projet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                testimonial={testimonial.testimonial}
                rating={testimonial.rating}
                image={testimonial.image}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/testimonials">Voir plus de témoignages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature section - Career coaching */}
      <FeatureSection
        title="Développez votre carrière"
        subtitle="Nos services de coaching vous aident à révéler votre potentiel professionnel et à vous démarquer sur le marché du travail concurrentiel."
        features={[
          {
            icon: <Briefcase size={24} />,
            title: "Préparation aux entretiens",
            description: "Des séances de simulation d'entretien personnalisées pour vous aider à gagner en confiance et à maîtriser votre discours."
          },
          {
            icon: <FileText size={24} />,
            title: "CV et Lettre de motivation",
            description: "Création de documents professionnels qui mettent en valeur vos compétences et attirent l'attention des recruteurs."
          },
          {
            icon: <GraduationCap size={24} />,
            title: "Bilan de compétences",
            description: "Évaluation approfondie de vos compétences et identification des opportunités de carrière adaptées à votre profil."
          }
        ]}
        imageSrc="https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?auto=format&fit=crop&w=1000&q=80"
        reversed={true}
      />

      {/* CTA section */}
      <CTA
        title="Prêt à démarrer votre projet?"
        description="Faites le premier pas vers votre nouvelle vie. Testez votre éligibilité ou contactez-nous pour un accompagnement personnalisé."
        buttonText="Tester mon éligibilité"
        buttonLink="/eligibility"
        secondaryButtonText="Contactez-nous"
        secondaryButtonLink="/contact"
      />
    </div>
  );
};

export default Index;
