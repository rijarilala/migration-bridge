import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface CheckboxOption {
  id: string;
  label: string;
  value: string;
}

interface EligibilityResult {
  program: string;
  eligible: boolean;
  message: string;
  details: string;
  level: "high" | "medium" | "low";
}

const EligibilityForm = () => {
  const initialFormData = {
    // Informations personnelles
    age: "",
    education: "",
    experience: "",
    
    // Compétences linguistiques séparées
    frenchLevel: "",
    englishLevel: "",
    
    // Informations professionnelles (pour PSTQ)
    profession: "",
    professionType: "",
    licenseInQuebec: "",
    exceptionalTalent: "",
    
    // Informations supplémentaires
    jobOffer: "",
    familyTies: "",
    canadaProject: "",
    
    // Contact
    name: "",
    email: "",
    phone: "",
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [results, setResults] = useState<EligibilityResult[]>([]);
  const [bestProgram, setBestProgram] = useState<string>("");

  // Options pour les cases à cocher
  const ageOptions: CheckboxOption[] = [
    { id: "age-18-29", label: "18 - 29 ans", value: "18-29" },
    { id: "age-30-39", label: "30 - 39 ans", value: "30-39" },
    { id: "age-40-44", label: "40 - 44 ans", value: "40-44" },
    { id: "age-45-plus", label: "45 ans et plus", value: "45+" },
  ];

  const educationOptions: CheckboxOption[] = [
    { id: "edu-none", label: "Aucun diplôme", value: "none" },
    { id: "edu-highschool", label: "Diplôme d'études secondaires", value: "highschool" },
    { id: "edu-postsecondary", label: "Diplôme postsecondaire (Bac+2)", value: "postsecondary" },
    { id: "edu-bachelor", label: "Licence (Bac+3)", value: "bachelor" },
    { id: "edu-master", label: "Master ou Doctorat", value: "master" },
  ];

  const experienceOptions: CheckboxOption[] = [
    { id: "exp-none", label: "Aucune expérience", value: "none" },
    { id: "exp-less1", label: "Moins d'un an", value: "less1" },
    { id: "exp-1-3", label: "1 - 3 ans", value: "1-3" },
    { id: "exp-4-5", label: "4 - 5 ans", value: "4-5" },
    { id: "exp-more5", label: "Plus de 5 ans", value: "more5" },
  ];

  const frenchLevelOptions: CheckboxOption[] = [
    { id: "french-none", label: "Aucune compétence", value: "none" },
    { id: "french-intermediate", label: "Niveau intermédiaire", value: "intermediate" },
    { id: "french-fluent", label: "Courant", value: "fluent" },
  ];

  const englishLevelOptions: CheckboxOption[] = [
    { id: "english-none", label: "Aucune compétence", value: "none" },
    { id: "english-intermediate", label: "Niveau intermédiaire", value: "intermediate" },
    { id: "english-fluent", label: "Courant", value: "fluent" },
  ];

  const projectOptions: CheckboxOption[] = [
    { id: "project-study", label: "Étudier", value: "study" },
    { id: "project-work", label: "Travailler", value: "work" },
    { id: "project-settle", label: "M'établir de façon permanente", value: "settle" },
    { id: "project-family", label: "Rejoindre un membre de ma famille", value: "family" },
  ];

  const professionTypeOptions: CheckboxOption[] = [
    { id: "prof-highly-skilled", label: "Profession hautement qualifiée (volet 1)", value: "highly-skilled" },
    { id: "prof-intermediate", label: "Profession intermédiaire/manuelle (volet 2)", value: "intermediate" },
    { id: "prof-regulated", label: "Profession réglementée requérant un permis au Québec (volet 3)", value: "regulated" },
    { id: "prof-exceptional", label: "Talent d'exception (volet 4)", value: "exceptional" },
    { id: "prof-unknown", label: "Je ne sais pas", value: "unknown" },
  ];

  const handleSingleOptionChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleCheckboxChange = (fieldName: string, checked: boolean) => {
    setFormData({ ...formData, [fieldName]: checked });
  };

  const handleTextChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
      // Scroll to the top of the form container smoothly
      const formContainer = document.querySelector('.eligibility-form-container');
      if (formContainer) {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    // Scroll to the top of the form container smoothly
    const formContainer = document.querySelector('.eligibility-form-container');
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetForm = () => {
    // Reset the form data to initial state
    setFormData(initialFormData);
    // Reset results
    setResults([]);
    setBestProgram("");
    // Return to step 1
    setCurrentStep(1);
    // Scroll to the top of the form container smoothly
    const formContainer = document.querySelector('.eligibility-form-container');
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    toast.success("Le formulaire a été réinitialisé");
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      if (!formData.age) {
        toast.error("Veuillez sélectionner votre tranche d'âge");
        return false;
      }
      if (!formData.education) {
        toast.error("Veuillez sélectionner votre niveau d'études");
        return false;
      }
      if (!formData.experience) {
        toast.error("Veuillez sélectionner votre expérience professionnelle");
        return false;
      }
      if (!formData.frenchLevel) {
        toast.error("Veuillez indiquer votre niveau de français");
        return false;
      }
      if (!formData.englishLevel) {
        toast.error("Veuillez indiquer votre niveau d'anglais");
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.professionType && formData.canadaProject === "work") {
        toast.error("Veuillez sélectionner un type de profession");
        return false;
      }
      if (!formData.jobOffer) {
        toast.error("Veuillez indiquer si vous avez une offre d'emploi");
        return false;
      }
      if (!formData.familyTies) {
        toast.error("Veuillez indiquer si vous avez des liens familiaux au Canada");
        return false;
      }
      if (!formData.canadaProject) {
        toast.error("Veuillez sélectionner au moins un projet au Canada");
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.name || !formData.email || !formData.phone) {
        toast.error("Veuillez remplir tous les champs de contact");
        return false;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Veuillez entrer une adresse email valide");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      // Calculer les résultats d'éligibilité
      const eligibilityResults = calculateEligibility();
      setResults(eligibilityResults);
      
      // Déterminer le meilleur programme
      const highEligibilityPrograms = eligibilityResults.filter(r => r.level === "high");
      if (highEligibilityPrograms.length > 0) {
        setBestProgram(highEligibilityPrograms[0].program);
      } else {
        const mediumEligibilityPrograms = eligibilityResults.filter(r => r.level === "medium");
        if (mediumEligibilityPrograms.length > 0) {
          setBestProgram(mediumEligibilityPrograms[0].program);
        } else {
          setBestProgram("Aucun programme optimal");
        }
      }
      
      // Passer à l'étape des résultats
      setCurrentStep(4);
      
      // Scroll to the top of the form container smoothly
      const formContainer = document.querySelector('.eligibility-form-container');
      if (formContainer) {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const calculateEligibility = (): EligibilityResult[] => {
    const results: EligibilityResult[] = [];
    
    // Points pour Entrée Express
    let expressPoints = 0;
    let expressMaxPoints = 100;
    
    // Points pour l'âge
    switch(formData.age) {
      case "18-29":
        expressPoints += 25;
        break;
      case "30-39":
        expressPoints += 20;
        break;
      case "40-44":
        expressPoints += 10;
        break;
      case "45+":
        expressPoints += 0;
        break;
    }
    
    // Points pour l'éducation
    switch(formData.education) {
      case "none":
        expressPoints += 0;
        break;
      case "highschool":
        expressPoints += 5;
        break;
      case "postsecondary":
        expressPoints += 15;
        break;
      case "bachelor":
        expressPoints += 20;
        break;
      case "master":
        expressPoints += 25;
        break;
    }
    
    // Points pour l'expérience professionnelle
    switch(formData.experience) {
      case "none":
        expressPoints += 0;
        break;
      case "less1":
        expressPoints += 5;
        break;
      case "1-3":
        expressPoints += 10;
        break;
      case "4-5":
        expressPoints += 15;
        break;
      case "more5":
        expressPoints += 20;
        break;
    }
    
    // Points pour les compétences linguistiques séparées
    switch(formData.frenchLevel) {
      case "fluent":
        expressPoints += 15;
        break;
      case "intermediate":
        expressPoints += 8;
        break;
      case "none":
        expressPoints += 0;
        break;
    }
    
    switch(formData.englishLevel) {
      case "fluent":
        expressPoints += 15;
        break;
      case "intermediate":
        expressPoints += 8;
        break;
      case "none":
        expressPoints += 0;
        break;
    }
    
    // Bonus pour offre d'emploi
    if (formData.jobOffer === "yes") expressPoints += 15;
    
    // Déterminer l'éligibilité pour Entrée Express
    let expressLevel: "high" | "medium" | "low" = "low";
    let expressMessage = "";
    let expressDetails = "";
    
    const expressPercentage = expressPoints / expressMaxPoints;
    if (expressPercentage >= 0.7) {
      expressLevel = "high";
      expressMessage = "✅ Vous semblez éligible à Entrée Express, découvrez les prochaines étapes !";
      expressDetails = "Votre profil correspond aux critères du programme Entrée Express. Nous vous recommandons de poursuivre votre démarche avec un conseiller en immigration.";
    } else if (expressPercentage >= 0.5) {
      expressLevel = "medium";
      expressMessage = "⚠️ Votre profil pourrait convenir à Entrée Express, contactez-nous pour une analyse approfondie.";
      expressDetails = "Vous avez un potentiel d'éligibilité au programme Entrée Express, mais certains aspects de votre profil pourraient nécessiter une attention particulière.";
    } else {
      expressLevel = "low";
      expressMessage = "❌ Vous ne remplissez pas actuellement les critères d'Entrée Express, mais d'autres options peuvent être envisageables.";
      expressDetails = "Votre profil actuel ne correspond pas suffisamment aux critères d'Entrée Express. Un conseiller pourrait vous suggérer d'autres programmes.";
    }
    
    results.push({
      program: "Entrée Express",
      eligible: expressLevel === "high",
      message: expressMessage,
      details: expressDetails,
      level: expressLevel
    });
    
    // Évaluation pour le PSTQ (Programme de sélection des travailleurs qualifiés - Québec)
    let pstqPoints = 0;
    let pstqMaxPoints = 100;
    
    // Points pour l'âge
    switch(formData.age) {
      case "18-29":
        pstqPoints += 20;
        break;
      case "30-39":
        pstqPoints += 16;
        break;
      case "40-44":
        pstqPoints += 8;
        break;
      case "45+":
        pstqPoints += 0;
        break;
    }
    
    // Points pour l'éducation
    switch(formData.education) {
      case "none":
        pstqPoints += 0;
        break;
      case "highschool":
        pstqPoints += 4;
        break;
      case "postsecondary":
        pstqPoints += 8;
        break;
      case "bachelor":
        pstqPoints += 14;
        break;
      case "master":
        pstqPoints += 18;
        break;
    }
    
    // Points pour l'expérience professionnelle
    switch(formData.experience) {
      case "none":
        pstqPoints += 0;
        break;
      case "less1":
        pstqPoints += 4;
        break;
      case "1-3":
        pstqPoints += 8;
        break;
      case "4-5":
        pstqPoints += 12;
        break;
      case "more5":
        pstqPoints += 16;
        break;
    }
    
    // Points pour les compétences linguistiques (Français priorisé pour le Québec)
    switch(formData.frenchLevel) {
      case "fluent":
        pstqPoints += 20;
        break;
      case "intermediate":
        pstqPoints += 10;
        break;
      case "none":
        pstqPoints += 0;
        break;
    }
    
    switch(formData.englishLevel) {
      case "fluent":
        pstqPoints += 10;
        break;
      case "intermediate":
        pstqPoints += 5;
        break;
      case "none":
        pstqPoints += 0;
        break;
    }
    
    // Bonus pour offre d'emploi
    if (formData.jobOffer === "yes") pstqPoints += 16;
    
    // Bonus spécifiques pour les volets du PSTQ
    let pstqVolet = "";
    let pstqVoletBonus = 0;
    
    switch(formData.professionType) {
      case "highly-skilled":
        pstqVolet = "Volet 1 (Professions hautement qualifiées)";
        if (formData.frenchLevel === "fluent") pstqVoletBonus += 10;
        if (formData.education === "master" || formData.education === "bachelor") pstqVoletBonus += 10;
        break;
      case "intermediate":
        pstqVolet = "Volet 2 (Professions intermédiaires et manuelles)";
        if (formData.experience === "4-5" || formData.experience === "more5") pstqVoletBonus += 15;
        break;
      case "regulated":
        pstqVolet = "Volet 3 (Professions réglementées)";
        if (formData.licenseInQuebec === "yes") pstqVoletBonus += 20;
        break;
      case "exceptional":
        pstqVolet = "Volet 4 (Talents d'exception)";
        if (formData.exceptionalTalent === "yes") pstqVoletBonus += 25;
        break;
      default:
        pstqVolet = "Non déterminé";
        break;
    }
    
    pstqPoints += pstqVoletBonus;
    
    // Déterminer l'éligibilité pour le PSTQ
    let pstqLevel: "high" | "medium" | "low" = "low";
    let pstqMessage = "";
    let pstqDetails = "";
    
    const pstqPercentage = pstqPoints / pstqMaxPoints;
    if (pstqPercentage >= 0.7) {
      pstqLevel = "high";
      pstqMessage = `✅ Vous semblez éligible au PSTQ ${pstqVolet}, découvrez les prochaines étapes !`;
      pstqDetails = `Votre profil correspond aux critères du Programme de sélection des travailleurs qualifiés du Québec pour le ${pstqVolet}. Nous vous recommandons de poursuivre votre démarche avec un conseiller.`;
    } else if (pstqPercentage >= 0.5) {
      pstqLevel = "medium";
      pstqMessage = `⚠️ Votre profil pourrait convenir au PSTQ ${pstqVolet}, contactez-nous pour une analyse approfondie.`;
      pstqDetails = `Vous avez un potentiel d'éligibilité au PSTQ pour le ${pstqVolet}, mais certains aspects de votre profil pourraient nécessiter une attention particulière.`;
    } else {
      pstqLevel = "low";
      pstqMessage = "❌ Vous ne remplissez pas actuellement les critères du PSTQ, mais d'autres options peuvent être envisageables.";
      pstqDetails = "Votre profil actuel ne correspond pas suffisamment aux critères du PSTQ. Un conseiller pourrait vous suggérer d'autres programmes.";
    }
    
    results.push({
      program: `Programme de sélection des travailleurs qualifiés (PSTQ) - ${pstqVolet}`,
      eligible: pstqLevel === "high",
      message: pstqMessage,
      details: pstqDetails,
      level: pstqLevel
    });
    
    // Évaluation pour le PEQ (Programme de l'Expérience Québécoise)
    const isPeqEligible = formData.frenchLevel === "fluent" || formData.frenchLevel === "intermediate";
    const peqLevel: "high" | "medium" | "low" = isPeqEligible ? 
      (formData.experience !== "none" ? "high" : "medium") : "low";
    
    let peqMessage = "";
    let peqDetails = "";
    
    if (peqLevel === "high") {
      peqMessage = "✅ Vous semblez éligible au PEQ, découvrez les prochaines étapes !";
      peqDetails = "Votre profil semble correspondre aux critères du Programme de l'Expérience Québécoise. Vos compétences en français et votre expérience professionnelle sont des atouts.";
    } else if (peqLevel === "medium") {
      peqMessage = "⚠️ Votre profil pourrait convenir au PEQ avec quelques ajustements.";
      peqDetails = "Vous pourriez être éligible au PEQ, mais il vous manque peut-être de l'expérience professionnelle pertinente.";
    } else {
      peqMessage = "❌ Vous ne remplissez pas actuellement les critères du PEQ.";
      peqDetails = "Le PEQ exige généralement une bonne maîtrise du français. Sans cette compétence, ce programme n'est pas recommandé.";
    }
    
    results.push({
      program: "Programme de l'Expérience Québécoise (PEQ)",
      eligible: peqLevel === "high",
      message: peqMessage,
      details: peqDetails,
      level: peqLevel
    });
    
    // Évaluation pour le regroupement familial
    const hasFamilyInCanada = formData.familyTies === "yes";
    const projectIsFamily = formData.canadaProject === "family";
    
    const familyLevel: "high" | "medium" | "low" = hasFamilyInCanada && projectIsFamily ? "high" : 
                                                   hasFamilyInCanada ? "medium" : "low";
    
    let familyMessage = "";
    let familyDetails = "";
    
    if (familyLevel === "high") {
      familyMessage = "✅ Vous semblez éligible au Regroupement Familial, découvrez les prochaines étapes !";
      familyDetails = "Avec de la famille directe au Canada et votre projet de les rejoindre, le programme de Regroupement Familial semble parfaitement adapté à votre situation.";
    } else if (familyLevel === "medium") {
      familyMessage = "⚠️ Vous pourriez être éligible au Regroupement Familial selon les liens familiaux exacts.";
      familyDetails = "Bien que vous ayez de la famille au Canada, l'éligibilité au Regroupement Familial dépend du type de relation et du statut de résidence de votre famille au Canada.";
    } else {
      familyMessage = "❌ Sans liens familiaux au Canada, vous n'êtes pas éligible au Regroupement Familial.";
      familyDetails = "Ce programme est exclusivement destiné aux personnes ayant des membres de leur famille proche déjà établis au Canada.";
    }
    
    results.push({
      program: "Regroupement Familial",
      eligible: familyLevel === "high",
      message: familyMessage,
      details: familyDetails,
      level: familyLevel
    });
    
    return results;
  };

  const getStatusBadgeClass = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high":
        return "Forte chance d'éligibilité";
      case "medium":
        return "Éligibilité possible";
      case "low":
        return "Faible chance d'éligibilité";
      default:
        return "Indéterminé";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto eligibility-form-container">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step === currentStep
                    ? "bg-brand-600 text-white"
                    : step < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step < currentStep ? "✓" : step}
              </div>
              <div className="text-xs text-gray-500">
                {step === 1
                  ? "Profil"
                  : step === 2
                  ? "Projet"
                  : step === 3
                  ? "Contact"
                  : "Résultats"}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-1 mt-4 rounded-full">
          <div
            className="bg-brand-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {currentStep === 1 && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Informations personnelles</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Âge (Sélectionner une tranche d'âge)</h3>
              <RadioGroup value={formData.age} onValueChange={(value) => handleSingleOptionChange("age", value)} className="grid gap-3">
                {ageOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem id={option.id} value={option.value} />
                    <Label htmlFor={option.id}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Niveau d'études</h3>
              <RadioGroup value={formData.education} onValueChange={(value) => handleSingleOptionChange("education", value)} className="grid gap-3">
                {educationOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem id={option.id} value={option.value} />
                    <Label htmlFor={option.id}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Expérience professionnelle</h3>
              <RadioGroup value={formData.experience} onValueChange={(value) => handleSingleOptionChange("experience", value)} className="grid gap-3">
                {experienceOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem id={option.id} value={option.value} />
                    <Label htmlFor={option.id}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Compétences linguistiques</h3>
              
              <div className="bg-blue-50 rounded-lg p-4 space-y-4">
                <h4 className="font-medium text-blue-800">Français</h4>
                <RadioGroup value={formData.frenchLevel} onValueChange={(value) => handleSingleOptionChange("frenchLevel", value)} className="grid gap-3">
                  {frenchLevelOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem id={option.id} value={option.value} />
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 space-y-4">
                <h4 className="font-medium text-red-800">Anglais</h4>
                <RadioGroup value={formData.englishLevel} onValueChange={(value) => handleSingleOptionChange("englishLevel", value)} className="grid gap-3">
                  {englishLevelOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem id={option.id} value={option.value} />
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Votre projet d'immigration</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Votre projet au Canada</h3>
              <RadioGroup value={formData.canadaProject} onValueChange={(value) => handleSingleOptionChange("canadaProject", value)} className="grid gap-3">
                {projectOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem id={option.id} value={option.value} />
                    <Label htmlFor={option.id}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {formData.canadaProject === "work" && (
              <div className="space-y-4 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium">Type de profession (PSTQ)</h3>
                <p className="text-sm text-blue-800 mb-4">
                  Le nouveau Programme de sélection des travailleurs qualifiés (PSTQ) du Québec comprend 4 volets distincts :
                </p>
                <RadioGroup value={formData.professionType} onValueChange={(value) => handleSingleOptionChange("professionType", value)} className="grid gap-3">
                  {professionTypeOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem id={option.id} value={option.value} />
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>

                {formData.professionType === "regulated" && (
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <h4 className="font-medium mb-2">Autorisation ou permis d'exercice</h4>
                    <RadioGroup value={formData.licenseInQuebec} onValueChange={(value) => handleSingleOptionChange("licenseInQuebec", value)} className="grid gap-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="license-yes" value="yes" />
                        <Label htmlFor="license-yes">J'ai ou je peux obtenir une autorisation d'exercice au Québec</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="license-no" value="no" />
                        <Label htmlFor="license-no">Je n'ai pas d'autorisation d'exercice au Québec</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {formData.professionType === "exceptional" && (
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <h4 className="font-medium mb-2">Talents d'exception</h4>
                    <RadioGroup value={formData.exceptionalTalent} onValueChange={(value) => handleSingleOptionChange("exceptionalTalent", value)} className="grid gap-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="talent-yes" value="yes" />
                        <Label htmlFor="talent-yes">J'ai une reconnaissance internationale dans mon domaine</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="talent-no" value="no" />
                        <Label htmlFor="talent-no">Je n'ai pas de reconnaissance internationale</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Offre d'emploi validée au Canada ?</h3>
              <RadioGroup value={formData.jobOffer} onValueChange={(value) => handleSingleOptionChange("jobOffer", value)} className="grid gap-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="job-yes" value="yes" />
                  <Label htmlFor="job-yes">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="job-no" value="no" />
                  <Label htmlFor="job-no">Non</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Avez-vous des liens familiaux au Canada ?</h3>
              <RadioGroup value={formData.familyTies} onValueChange={(value) => handleSingleOptionChange("familyTies", value)} className="grid gap-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="family-yes" value="yes" />
                  <Label htmlFor="family-yes">Oui (famille directe: parents, frères/sœurs, enfants)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="family-no" value="no" />
                  <Label htmlFor="family-no">Non</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Vos coordonnées</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleTextChange("name", e.target.value)}
                  placeholder="Entrez votre nom complet"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleTextChange("email", e.target.value)}
                  placeholder="votre@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleTextChange("phone", e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe pour une analyse plus approfondie de votre situation.
              </p>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Résultats de votre évaluation</h2>
              <p className="text-gray-600 mb-6">
                Voici une analyse préliminaire de votre admissibilité aux différents programmes d'immigration canadiens.
              </p>
            </div>

            {bestProgram && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-blue-800 mb-2">Recommandation principale</h3>
                <p>
                  Selon votre profil, le programme le plus adapté à votre situation est le <span className="font-bold">{bestProgram}</span>.
                </p>
              </div>
            )}

            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className={`p-4 ${result.level === "high" ? "bg-green-50 border-b border-green-200" : result.level === "medium" ? "bg-yellow-50 border-b border-yellow-200" : "bg-red-50 border-b border-red-200"}`}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">{result.program}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(result.level)}`}>
                        {getStatusText(result.level)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-gray-700 font-medium mb-2">{result.message}</p>
                    <p className="text-gray-600 text-sm">{result.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
              <h3 className="font-semibold mb-2">Prochaines étapes</h3>
              <p className="text-gray-600 mb-4">
                Pour continuer votre processus d'immigration, nous vous recommandons de :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Consulter notre simulateur détaillé pour une évaluation plus précise</li>
                <li>Prendre rendez-vous avec un de nos consultants en immigration</li>
                <li>Préparer vos documents justificatifs (diplômes, certificats de langue, etc.)</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button type="button" onClick={resetForm} variant="outline">
                Faire un nouveau test
              </Button>
              <Button asChild className="bg-brand-600 hover:bg-brand-700">
                <a href="/contact">Prendre rendez-vous avec un consultant</a>
              </Button>
            </div>
          </div>
        )}

        {currentStep < 3 && (
          <div className="flex justify-end">
            <Button type="button" onClick={handleNextStep} className="bg-brand-600 hover:bg-brand-700">
              Continuer
            </Button>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="flex justify-end">
            <Button type="submit" className="bg-brand-600 hover:bg-brand-700">
              Soumettre
            </Button>
          </div>
        )}
        
        {currentStep > 1 && currentStep < 4 && (
          <div className="flex justify-start mt-6">
            <Button type="button" variant="outline" onClick={handlePrevStep}>
              Précédent
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EligibilityForm;
