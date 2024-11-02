import { generateApi } from 'swagger-typescript-api';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import prettier from 'prettier';

dotenv.config();

const PREFIX_URL = process.env.NEXT_PUBLIC_API_URL!;

if (!PREFIX_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

const apis = [
  {
    name: 'club',
    url: `${PREFIX_URL}/club/v3/api-docs`,
    output: 'apis/__generated__/club',
  },
  {
    name: 'application',
    url: `${PREFIX_URL}/application/v3/api-docs`,
    output: 'apis/__generated__/application',
  },
  {
    name: 'auth',
    url: `${PREFIX_URL}/auth/v3/api-docs`,
    output: 'apis/__generated__/auth',
  },
];

async function getPrettierConfig() {
  try {
    const prettierConfig = await prettier.resolveConfig(process.cwd());
    return prettierConfig || {};
  } catch (error) {
    console.warn('Failed to load prettier config, using defaults:', error);
    return {};
  }
}

async function generateApiClient(api: (typeof apis)[0]) {
  try {
    const prettierConfig = await getPrettierConfig();
    const result = await generateApi({
      name: 'swagger.ts',
      output: path.resolve(api.output),
      url: api.url,
      moduleNameFirstTag: true,
      generateClient: true,
      generateRouteTypes: true,
      generateResponses: true,
      unwrapResponseData: true,
      extractRequestParams: true,
      extractRequestBody: true,
      httpClientType: 'fetch',
      prettier: {
        ...prettierConfig,
        parser: 'typescript',
      },
      defaultResponseAsSuccess: false,
      enumNamesAsValues: true,
    });

    console.log(`Successfully generated API client for ${api.url}`);
    return result;
  } catch (error) {
    console.error(`Failed to generate API client for ${api.url}:`, error);
    throw error;
  }
}

const generatedDir = path.resolve('apis/__generated__');

async function cleanupDirectories() {
  const targetApis = process.argv.slice(2);

  if (targetApis.length === 0) {
    if (fs.existsSync(generatedDir)) {
      fs.rmSync(generatedDir, { recursive: true, force: true });
      console.log(`전체 generated 디렉토리 삭제 완료: ${generatedDir}`);
    }
    return;
  }

  const apisToClean = apis.filter(api => targetApis.includes(api.name));
  apisToClean.forEach(api => {
    const apiDir = path.resolve(api.output);
    if (fs.existsSync(apiDir)) {
      fs.rmSync(apiDir, { recursive: true, force: true });
      console.log(`${api.name} API 디렉토리 삭제 완료: ${apiDir}`);
    }
  });
}

async function generateAllApis() {
  try {
    await cleanupDirectories();

    const targetApis = process.argv.slice(2);
    let apisToGenerate = apis;

    if (targetApis.length > 0) {
      apisToGenerate = apis.filter(api => targetApis.includes(api.name));
      if (apisToGenerate.length === 0) {
        console.error('지정된 API를 찾을 수 없습니다.');
        process.exit(1);
      }
    }

    await Promise.all(apisToGenerate.map(generateApiClient));
    console.log('API 클라이언트 생성이 완료되었습니다.');
  } catch (error) {
    console.error('API 클라이언트 생성 실패:', error);
    process.exit(1);
  }
}

generateAllApis();
