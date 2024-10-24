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
    url: `${PREFIX_URL}/club/v3/api-docs`,
    output: 'apis/__generated__/club',
  },
  {
    url: `${PREFIX_URL}/application/v3/api-docs`,
    output: 'apis/__generated__/application',
  },
];

// Prettier 설정 로드
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

// 기존 생성된 파일들 삭제
if (fs.existsSync(generatedDir)) {
  fs.rmSync(generatedDir, { recursive: true, force: true });
  console.log(`Cleaned up directory: ${generatedDir}`);
}

// 모든 API 생성 실행
async function generateAllApis() {
  try {
    await Promise.all(apis.map(generateApiClient));
    console.log('All API clients generated successfully');

    // // 인덱스 파일 생성
    // const indexContent = apis
    //   .map(api => {
    //     const moduleName = path.basename(api.output);
    //     return `export * from './${moduleName}/swagger';`;
    //   })
    //   .join('\n');

    // const prettierConfig = await getPrettierConfig();
    // const formattedIndexContent = await prettier.format(indexContent, {
    //   ...prettierConfig,
    //   parser: 'typescript',
    // });

    // const indexPath = path.join(generatedDir, 'index.ts');
    // fs.writeFileSync(indexPath, formattedIndexContent);
  } catch (error) {
    console.error('Failed to generate API clients:', error);
    process.exit(1);
  }
}

generateAllApis();
