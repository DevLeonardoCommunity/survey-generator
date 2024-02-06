import { SurveyDefinition, SurveyDefinitionWithId } from "@/types/survey";
import { useEffect, useMemo, useState } from "react";

const storageKey = "surveys";

export const useStorage = () => {
  const [allSurveys, setAllSurveys] = useState<
    Record<string, SurveyDefinitionWithId>
  >({});

  useEffect(() => {
    setAllSurveys(getSurveys());
  }, []);

  const save = (surveyDefinition: SurveyDefinition) => {
    const id = surveyDefinition.id || Math.random().toString(36).substring(7);
    const surveys = getSurveys();
    surveys[id] = { ...surveyDefinition, id };
    localStorage.setItem(storageKey, JSON.stringify(surveys));

    setAllSurveys(surveys);

    return id;
  };

  const getSurveys = (): Record<string, SurveyDefinitionWithId> => {
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
