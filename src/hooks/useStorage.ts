import { generateId } from "@/lib/utils";
import { SurveyDefinition } from "@/types/survey";
import { useEffect, useMemo, useState } from "react";

const storageKey = "surveys";

export const useStorage = () => {
  const [allSurveys, setAllSurveys] = useState<
    Record<string, SurveyDefinition>
  >({});

  useEffect(() => {
    setAllSurveys(getSurveys());
  }, []);

  const save = (surveyDefinition: SurveyDefinition) => {
    const id = surveyDefinition.id || generateId();
    const surveys = getSurveys();
    surveys[id] = { ...surveyDefinition, id };
    localStorage.setItem(storageKey, JSON.stringify(surveys));

    setAllSurveys(surveys);

    return id;
  };

  const getSurveys = (): Record<string, SurveyDefinition> => {
    const surveys = localStorage.getItem(storageKey) || "{}";
    return JSON.parse(surveys);
  };

  const allSurveysList = useMemo(() => Object.values(allSurveys), [allSurveys]);

  return {
    save,
    allSurveys,
    allSurveysList,
  };
};
