import React, { createContext, useContext, useState, useEffect } from "react";
import { MediaService } from "../../domain/services";
import { EditDataUseCase } from "../../domain/use_cases";
import { EditDataRepositoryImpl } from "../../infra/repositories";
import {
  FfmpegPlayableMediaService,
  FilesServiceImpl,
  ImageMediaServiceImpl,
} from "../../infra/services";

type UseCaseContextType = {
  editDataUseCase: EditDataUseCase | null;
};

const UseCaseContext = createContext<UseCaseContextType>({
  editDataUseCase: null,
});

type UseCaseProviderProps = {
  children: React.ReactNode;
};

export const UseCaseProvider: React.FC<UseCaseProviderProps> = ({
  children,
}) => {
  const [editDataUseCase, setEditDataUseCase] =
    useState<EditDataUseCase | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const editDataRepository = new EditDataRepositoryImpl();
        const editDataUseCaseInstance = new EditDataUseCase(
          editDataRepository,
          new MediaService(
            new FfmpegPlayableMediaService(),
            new ImageMediaServiceImpl(),
          ),
          new FilesServiceImpl(),
        );

        await editDataRepository.initDatabase();

        setEditDataUseCase(editDataUseCaseInstance);
      } catch (error) {
        console.error("Failed to initialize use cases:", error);
      }
    })();
  }, []);

  return (
    <UseCaseContext.Provider value={{ editDataUseCase }}>
      {children}
    </UseCaseContext.Provider>
  );
};

export const useUseCases = (): UseCaseContextType => {
  const context = useContext(UseCaseContext);
  if (!context) {
    throw new Error("useUseCases must be used within a UseCaseProvider");
  }
  return context;
};
