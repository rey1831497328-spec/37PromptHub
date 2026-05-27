// 调试搜索算法
const query = '站着的人';
const stopWords = new Set(['的', '了', '着', '是', '在', '和', '与', '或', '有', '无', '不', '很', '太', '最', '个', '一', '种', '被', '把', '给', '让', '到', '从', '对', '为', '也', '都', '会', '能', '要', '就', '而', '但', '又', '如', '之']);

// 分词
const rawSegments = query.toLowerCase().split(/[\s,，、]+/).filter(s => s.length > 0);

const keywordInfo = new Map();
for (const segment of rawSegments) {
  const segmentLen = [...segment].length;
  const chars = [...segment];
  const hasStopWord = chars.some(c => stopWords.has(c));
  
  if (hasStopWord && segment.length > 1) {
    let currentWord = '';
    let position = 0;
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (stopWords.has(char)) {
        if (currentWord.length > 0) {
          const existing = keywordInfo.get(currentWord);
          const newWeight = segmentLen * 10 + (10 - position);
          if (!existing || (existing.originalLength * 10 + (10 - existing.position)) < newWeight) {
            keywordInfo.set(currentWord, { originalLength: segmentLen, position });
          }
          currentWord = '';
        }
        position = i + 1;
      } else {
        if (currentWord === '') {
          position = i;
        }
        currentWord += char;
      }
    }
    if (currentWord.length > 0) {
      const existing = keywordInfo.get(currentWord);
      const newWeight = segmentLen * 10 + (10 - position);
      if (!existing || (existing.originalLength * 10 + (10 - existing.position)) < newWeight) {
        keywordInfo.set(currentWord, { originalLength: segmentLen, position });
      }
    }
  } else {
    const existing = keywordInfo.get(segment);
    const newWeight = segmentLen * 10 + 10;
    if (!existing || (existing.originalLength * 10 + (10 - existing.position)) < newWeight) {
      keywordInfo.set(segment, { originalLength: segmentLen, position: 0 });
    }
  }
}

const uniqueKeywords = Array.from(keywordInfo.entries())
  .filter(([k]) => k.length > 0)
  .map(([k, info]) => ({ keyword: k, originalLength: info.originalLength, position: info.position }));

console.log('关键词:', uniqueKeywords);

// 测试数据
const testPrompts = [
  {
    title: '人物反向提示词',
    description: '专门针对人物生成的反向提示词',
    prompt_cn: '丑陋、变形、噪点、模糊、扭曲、失焦、错误解剖、多余肢体、画得差的脸、画得差的手、缺失手指、变异、变形、水印、文字、错误',
    prompt: 'ugly, deformed, noisy, blurry, distorted, out of focus, bad anatomy',
    negative_prompt: '',
    negative_prompt_cn: ''
  },
  {
    title: '站立姿势',
    description: '自然站立姿势',
    prompt_cn: '站立姿势、全身站立、自信站姿、挺直姿态、自然站立',
    prompt: 'standing pose, full body standing, confident stance',
    negative_prompt: '',
    negative_prompt_cn: ''
  }
];

const fields = [
  { key: 'title', weight: 10, isTitle: true },
  { key: 'prompt_cn', weight: 5, isTitle: false },
  { key: 'prompt', weight: 5, isTitle: false },
  { key: 'description', weight: 3, isTitle: false },
  { key: 'negative_prompt', weight: 2, isTitle: false },
  { key: 'negative_prompt_cn', weight: 2, isTitle: false },
];

function smartMatch(text, keyword) {
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();
  const keywordLen = [...lowerKeyword].length;

  // 1. 精确包含匹配
  if (lowerText.includes(lowerKeyword)) {
    const bonus = lowerText === lowerKeyword ? 1.5 : 1.0;
    return { score: bonus, type: 3, matchedLen: keywordLen };
  }

  const keywordChars = [...lowerKeyword];
  const textChars = [...lowerText];
  const significantChars = keywordChars.filter(c => !stopWords.has(c));

  // 2. 前缀匹配
  if (keywordChars.length > 0 && textChars.length > 0) {
    let commonPrefixLen = 0;
    for (let i = 0; i < Math.min(keywordChars.length, textChars.length); i++) {
      if (keywordChars[i] === textChars[i]) {
        commonPrefixLen++;
      } else {
        break;
      }
    }
    if (commonPrefixLen >= 1) {
      const ratio = commonPrefixLen / keywordChars.length;
      if (ratio >= 0.5) {
        return { score: 0.8 + ratio * 0.2, type: 2, matchedLen: commonPrefixLen };
      }
      if (ratio >= 0.3) {
        return { score: 0.6 + ratio * 0.4, type: 2, matchedLen: commonPrefixLen };
      }
    }
  }

  // 3. 中文词汇片段匹配
  const chineseWords = lowerText.match(/[\u4e00-\u9fa5]+/g) || [];
  let bestFragmentScore = 0;
  let bestMatchedLen = 0;
  for (const word of chineseWords) {
    if (lowerKeyword.includes(word) || word.includes(lowerKeyword)) {
      const overlap = [...lowerKeyword].filter(c => word.includes(c)).length;
      const ratio = overlap / keywordChars.length;
      if (ratio >= 0.5 && ratio > bestFragmentScore) {
        bestFragmentScore = ratio;
        bestMatchedLen = overlap;
      }
    }
  }
  if (bestFragmentScore > 0) {
    return { score: bestFragmentScore * 0.7, type: 2, matchedLen: bestMatchedLen };
  }

  // 4. 字符集合匹配
  if (significantChars.length > 0) {
    const textCharSet = new Set(lowerText);
    const matchedChars = significantChars.filter(c => textCharSet.has(c));
    const ratio = matchedChars.length / significantChars.length;
    if (ratio >= 0.5) {
      return { score: ratio * 0.4, type: 1, matchedLen: matchedChars.length };
    }
  }

  return { score: 0, type: 0, matchedLen: 0 };
}

function calculateScore(prompt) {
  let totalScore = 0;
  let matchedKeywords = 0;
  let titleMatchedKeywords = 0;
  let titleMatchedCharCount = 0;
  let hasTitleExactMatch = false;

  const titleText = (prompt.title || '').toLowerCase();

  // 阶段1：完整原始查询匹配
  const originalQuery = query.toLowerCase().trim();
  if (titleText.includes(originalQuery)) {
    totalScore += 2000;
    hasTitleExactMatch = true;
  }

  // 阶段2：逐关键词评分
  const typeMultiplier = { 3: 5, 2: 2.5, 1: 0.3, 0: 0 };

  for (const { keyword, originalLength, position } of uniqueKeywords) {
    const keywordLen = [...keyword].length;
    let bestFieldScore = 0;
    let bestType = 0;
    let bestMatchedLen = 0;
    let isTitleMatch = false;
    let matchDetails = [];

    for (const field of fields) {
      const text = prompt[field.key] || '';
      const { score, type, matchedLen } = smartMatch(text, keyword);
      if (score > 0) {
        let fieldScore = score * field.weight * typeMultiplier[type];
        const lengthBonus = Math.log(originalLength + 1);
        fieldScore *= (1 + lengthBonus * 0.5);
        
        // 位置加权
        const positionBonus = Math.max(0.3 - position * 0.1, 0);
        fieldScore *= (1 + positionBonus);

        if (field.isTitle) {
          fieldScore *= 4;
          if (fieldScore > bestFieldScore) {
            bestFieldScore = fieldScore;
            bestType = type;
            bestMatchedLen = matchedLen;
            isTitleMatch = true;
          }
        } else if (fieldScore > bestFieldScore) {
          bestFieldScore = fieldScore;
          bestType = type;
          bestMatchedLen = matchedLen;
          isTitleMatch = false;
        }
        
        matchDetails.push({
          field: field.key,
          score: score.toFixed(2),
          type,
          fieldScore: fieldScore.toFixed(2),
          isTitle: field.isTitle
        });
      }
    }

    if (bestFieldScore > 0) {
      matchedKeywords++;
      if (isTitleMatch) {
        titleMatchedKeywords++;
        titleMatchedCharCount += bestMatchedLen;
        if (bestType === 3) hasTitleExactMatch = true;
      }
      totalScore += bestFieldScore;
      console.log(`  关键词"${keyword}": 最佳分数=${bestFieldScore.toFixed(2)}, 类型=${bestType}, 标题匹配=${isTitleMatch}`);
      console.log(`    详情:`, matchDetails.filter(m => m.fieldScore > 0));
    } else {
      console.log(`  关键词"${keyword}": 未匹配`);
    }
  }

  // 阶段3：标题匹配整体加权
  if (titleMatchedKeywords > 0) {
    totalScore *= 2.5;
    totalScore += titleMatchedCharCount * 15;
    if (titleMatchedKeywords === uniqueKeywords.length) {
      totalScore *= 1.5;
    }
  }

  // 阶段4：关键词覆盖率加权
  if (uniqueKeywords.length > 1) {
    const coverageRatio = matchedKeywords / uniqueKeywords.length;
    totalScore *= (0.6 + 0.4 * coverageRatio);
  }

  // 阶段5：精确匹配额外奖励
  if (hasTitleExactMatch) {
    totalScore *= 1.3;
  }

  return { totalScore: Math.round(totalScore), matchedKeywords, titleMatchedKeywords, titleMatchedCharCount };
}

console.log('\n=== 测试搜索 ===\n');

for (const prompt of testPrompts) {
  console.log(`\n${prompt.title}:`);
  const result = calculateScore(prompt);
  console.log(`  总分: ${result.totalScore}`);
  console.log(`  匹配关键词数: ${result.matchedKeywords}`);
  console.log(`  标题匹配关键词数: ${result.titleMatchedKeywords}`);
  console.log(`  标题匹配字符数: ${result.titleMatchedCharCount}`);
}
