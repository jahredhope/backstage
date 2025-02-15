/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { SidebarItem } from '@backstage/core-components';
import { IconComponent } from '@backstage/core-plugin-api';
import { SearchModal } from '../SearchModal';
import { useSearch } from '../SearchContext';

export type SidebarSearchModalProps = {
  icon?: IconComponent;
};

export const SidebarSearchModal = (props: SidebarSearchModalProps) => {
  const { open, toggleModal } = useSearch();
  const Icon = props.icon ? props.icon : SearchIcon;

  return (
    <>
      <SidebarItem
        className="search-icon"
        icon={Icon}
        text="Search"
        onClick={toggleModal}
      />
      <SearchModal open={open} toggleModal={toggleModal} />
    </>
  );
};
