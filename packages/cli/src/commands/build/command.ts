/*
 * Copyright 2020 The Backstage Authors
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

import { Command } from 'commander';
import { buildPackage, Output } from '../../lib/builder';
import { PackageRoleName, readRoleForCommand } from '../../lib/role';

const bundledRoles: PackageRoleName[] = ['app', 'backend'];

const esmPlatforms = ['web', 'common'];
const cjsPlatforms = ['node', 'common'];

export async function command(cmd: Command): Promise<void> {
  const roleInfo = await readRoleForCommand(cmd);

  if (bundledRoles.includes(roleInfo.role)) {
    throw new Error(
      `Build command is not supported for package role '${roleInfo.role}'`,
    );
  }

  const outputs = new Set<Output>();

  if (cjsPlatforms.includes(roleInfo.platform)) {
    outputs.add(Output.cjs);
  }
  if (esmPlatforms.includes(roleInfo.platform)) {
    outputs.add(Output.esm);
  }
  if (roleInfo.role !== 'cli') {
    outputs.add(Output.types);
  }

  await buildPackage({
    outputs,
    minify: Boolean(cmd.minify),
    useApiExtractor: Boolean(cmd.experimentalTypeBuild),
  });
}