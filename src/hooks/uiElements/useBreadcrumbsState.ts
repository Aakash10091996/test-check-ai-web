"use client";
import { defaultElement, defaultBreadcrumbSelection } from "@/constants";
import { BreadcrumbsPageOptions } from "@/constants/breadcrumbsPageOptions";
import { Components } from "@/constants/components";
import { DummyProjects } from "@/constants";
import { UiElements } from "@/constants/uiElements";
import { useCallback, useEffect, useState } from "react";
import { useComponentsView } from "@/utils";
import { useRouter } from "next/navigation";

interface BreadcrumbsSelection {
  page: string;
  element: string;
}

export function useBreadcrumbsState() {
  const { isComponentView, uiElement, framework } = useComponentsView();
  const router = useRouter();
  const [breadcrumbsSelection, setBreadcrumbsSelection] = useState<BreadcrumbsSelection>({
    page: defaultBreadcrumbSelection,
    element: defaultElement,
  });

  useEffect(() => {
    let defaultElement: string;
    if (breadcrumbsSelection.page === BreadcrumbsPageOptions[0].value) {
      defaultElement = Components[0].name;
    } else if (breadcrumbsSelection.page === BreadcrumbsPageOptions[1].value) {
      defaultElement = DummyProjects[0].name;
    } else {
      defaultElement = UiElements[0].name;
    }

    setBreadcrumbsSelection((prev) => ({
      ...prev,
      element: defaultElement,
    }));
  }, [breadcrumbsSelection.page]);

  useEffect(() => {
    setBreadcrumbsSelection((prev) => ({
      ...prev,
      page: isComponentView ? BreadcrumbsPageOptions[0].value : BreadcrumbsPageOptions[1].value,
    }));
  }, [isComponentView]);

  const handleChangeOption = (value: string) => {
    setBreadcrumbsSelection({ ...breadcrumbsSelection, page: value });
    router.push(`/${value.toLocaleLowerCase()}/${framework}/${uiElement}`);
  };

  const handleChangeElement = (value: string) => {
    setBreadcrumbsSelection({ ...breadcrumbsSelection, element: value });
  };

  const getListForPage = useCallback(() => {
    if (breadcrumbsSelection.page === BreadcrumbsPageOptions[0].value) {
      return Components;
    } else if (breadcrumbsSelection.page === BreadcrumbsPageOptions[1].value) {
      return DummyProjects;
    } else {
      return UiElements;
    }
  }, [breadcrumbsSelection.page]);

  return {
    breadcrumbsSelection,
    setBreadcrumbsSelection,
    getListForPage,
    handleChangeOption,
    handleChangeElement,
  };
}
