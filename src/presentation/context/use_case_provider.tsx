import React, { createContext, useContext } from "react";
import { MediaService } from "../../domain/services";
import { EditDataUseCase } from "../../domain/use_cases";
import { EditDataRepositoryImpl } from "../../infra/repositories";
import {
  FfmpegPlayableMediaService,
  FilesServiceImpl,
  ImageMediaServiceImpl,
} from "../../infra/services";

const editDataUseCaseInstance = new EditDataUseCase(
  new EditDataRepositoryImpl(),
  new MediaService(
    new FfmpegPlayableMediaService(),
    new ImageMediaServiceImpl(),
  ),
  new FilesServiceImpl(),
);

const UseCaseContext = createContext({
  editDataUseCase: editDataUseCaseInstance,
});

type UseCaseProviderProps = {
  children: React.ReactNode;
};

export const UseCaseProvider: React.FC<UseCaseProviderProps> = ({
  children,
}) => (
  <UseCaseContext.Provider value={{ editDataUseCase: editDataUseCaseInstance }}>
    {children}
  </UseCaseContext.Provider>
);

export const useUseCases = () => useContext(UseCaseContext);
