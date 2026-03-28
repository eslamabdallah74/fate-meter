import { useI18n } from '../composables/useI18n'

export function getFutureState(regret) {
  if (regret < 30) return 'stable'
  if (regret < 60) return 'warning'
  return 'danger'
}

export function getStateEmoji(state) {
  const map = { stable: '😌', warning: '😰', danger: '😵' }
  return map[state] || '❓'
}

export function getStateLabel(state) {
  const { t } = useI18n()
  const map = { stable: t('stateStable'), warning: t('stateWarning'), danger: t('stateDanger') }
  return map[state] || 'Unknown'
}

export function getStateDescription(state) {
  const { t } = useI18n()
  const map = { stable: t('descStable'), warning: t('descWarning'), danger: t('descDanger') }
  return map[state] || ''
}

export function getRegretColor(regret) {
  if (regret < 30) return '#00ff88'
  if (regret < 60) return '#ffaa00'
  return '#ff3366'
}

// Categories with i18n keys
export const categories = [
  {
    id: 'study',
    nameKey: 'catStudy',
    icon: '📚',
    color: '#00ff88',
    activities: [
      { id: 'deep-study', labelKey: 'actDeepStudy', icon: '📖', regretChange: -10, messageKey: 'msgDeepStudy' },
      { id: 'read-chapter', labelKey: 'actReadChapter', icon: '📗', regretChange: -7, messageKey: 'msgReadChapter' },
      { id: 'review-notes', labelKey: 'actReviewNotes', icon: '📝', regretChange: -5, messageKey: 'msgReviewNotes' },
      { id: 'practice-problems', labelKey: 'actPracticeProblems', icon: '🧮', regretChange: -8, messageKey: 'msgPracticeProblems' },
      { id: 'write-essay', labelKey: 'actWriteEssay', icon: '✍️', regretChange: -9, messageKey: 'msgWriteEssay' },
      { id: 'complete-assignment', labelKey: 'actCompleteAssignment', icon: '✅', regretChange: -8, messageKey: 'msgCompleteAssignment' },
      { id: 'online-course', labelKey: 'actOnlineCourse', icon: '💻', regretChange: -7, messageKey: 'msgOnlineCourse' },
      { id: 'research-topic', labelKey: 'actResearchTopic', icon: '🔬', regretChange: -6, messageKey: 'msgResearchTopic' },
      { id: 'study-group', labelKey: 'actStudyGroup', icon: '👥', regretChange: -6, messageKey: 'msgStudyGroup' },
      { id: 'watch-lecture', labelKey: 'actWatchLecture', icon: '🎥', regretChange: -6, messageKey: 'msgWatchLecture' }
    ]
  },
  {
    id: 'focus',
    nameKey: 'catFocus',
    icon: '🎯',
    color: '#00aaff',
    activities: [
      { id: 'focus-10', labelKey: 'actFocus10', icon: '⏱️', regretChange: -5, messageKey: 'msgFocus10' },
      { id: 'pomodoro', labelKey: 'actPomodoro', icon: '🍅', regretChange: -8, messageKey: 'msgPomodoro' },
      { id: 'meditate', labelKey: 'actMeditate', icon: '🧘', regretChange: -4, messageKey: 'msgMeditate' },
      { id: 'plan-day', labelKey: 'actPlanDay', icon: '📋', regretChange: -5, messageKey: 'msgPlanDay' },
      { id: 'organize-space', labelKey: 'actOrganizeSpace', icon: '🗂️', regretChange: -3, messageKey: 'msgOrganizeSpace' },
      { id: 'review-goals', labelKey: 'actReviewGoals', icon: '🎯', regretChange: -4, messageKey: 'msgReviewGoals' },
      { id: 'deep-breathing', labelKey: 'actDeepBreathing', icon: '🌬️', regretChange: -3, messageKey: 'msgDeepBreathing' },
      { id: 'journal', labelKey: 'actJournal', icon: '📓', regretChange: -4, messageKey: 'msgJournal' }
    ]
  },
  {
    id: 'work',
    nameKey: 'catWork',
    icon: '💼',
    color: '#44ddff',
    activities: [
      { id: 'finish-task', labelKey: 'actFinishTask', icon: '🏁', regretChange: -8, messageKey: 'msgFinishTask' },
      { id: 'reply-emails', labelKey: 'actReplyEmails', icon: '📧', regretChange: -4, messageKey: 'msgReplyEmails' },
      { id: 'prepare-presentation', labelKey: 'actPreparePresentation', icon: '📊', regretChange: -7, messageKey: 'msgPreparePresentation' },
      { id: 'code-practice', labelKey: 'actCodePractice', icon: '👨‍💻', regretChange: -8, messageKey: 'msgCodePractice' },
      { id: 'skill-practice', labelKey: 'actSkillPractice', icon: '🎨', regretChange: -6, messageKey: 'msgSkillPractice' },
      { id: 'networking', labelKey: 'actNetworking', icon: '🤝', regretChange: -4, messageKey: 'msgNetworking' },
      { id: 'side-project', labelKey: 'actSideProject', icon: '🚀', regretChange: -7, messageKey: 'msgSideProject' },
      { id: 'learn-tool', labelKey: 'actLearnTool', icon: '🔧', regretChange: -5, messageKey: 'msgLearnTool' }
    ]
  },
  {
    id: 'health',
    nameKey: 'catHealth',
    icon: '🏃',
    color: '#88ff44',
    activities: [
      { id: 'exercise', labelKey: 'actExercise', icon: '💪', regretChange: -7, messageKey: 'msgExercise' },
      { id: 'walk', labelKey: 'actWalk', icon: '🚶', regretChange: -4, messageKey: 'msgWalk' },
      { id: 'stretch', labelKey: 'actStretch', icon: '🧘‍♀️', regretChange: -3, messageKey: 'msgStretch' },
      { id: 'cook-healthy', labelKey: 'actCookHealthy', icon: '🥗', regretChange: -4, messageKey: 'msgCookHealthy' },
      { id: 'drink-water', labelKey: 'actDrinkWater', icon: '💧', regretChange: -2, messageKey: 'msgDrinkWater' },
      { id: 'early-sleep', labelKey: 'actEarlySleep', icon: '😴', regretChange: -5, messageKey: 'msgEarlySleep' },
      { id: 'skipped-exercise', labelKey: 'actSkippedExercise', icon: '🛋️', regretChange: 5, messageKey: 'msgSkippedExercise' },
      { id: 'junk-food', labelKey: 'actJunkFood', icon: '🍔', regretChange: 4, messageKey: 'msgJunkFood' }
    ]
  },
  {
    id: 'distractions',
    nameKey: 'catDistractions',
    icon: '📱',
    color: '#ff6600',
    activities: [
      { id: 'scroll-social', labelKey: 'actScrollSocial', icon: '📲', regretChange: 7, messageKey: 'msgScrollSocial' },
      { id: 'watch-youtube', labelKey: 'actWatchYouTube', icon: '▶️', regretChange: 6, messageKey: 'msgWatchYouTube' },
      { id: 'play-games', labelKey: 'actPlayGames', icon: '🎮', regretChange: 8, messageKey: 'msgPlayGames' },
      { id: 'binge-watch', labelKey: 'actBingeWatch', icon: '📺', regretChange: 9, messageKey: 'msgBingeWatch' },
      { id: 'random-browse', labelKey: 'actRandomBrowse', icon: '🌐', regretChange: 5, messageKey: 'msgRandomBrowse' },
      { id: 'chat-hours', labelKey: 'actChatHours', icon: '💬', regretChange: 5, messageKey: 'msgChatHours' },
      { id: 'online-shopping', labelKey: 'actOnlineShopping', icon: '🛒', regretChange: 6, messageKey: 'msgOnlineShopping' },
      { id: 'tiktok-scroll', labelKey: 'actTiktokScroll', icon: '🎵', regretChange: 8, messageKey: 'msgTiktokScroll' }
    ]
  },
  {
    id: 'skipping',
    nameKey: 'catSkipping',
    icon: '⏭️',
    color: '#ff3366',
    activities: [
      { id: 'skip-class', labelKey: 'actSkipClass', icon: '🏫', regretChange: 10, messageKey: 'msgSkipClass' },
      { id: 'skip-work', labelKey: 'actSkipWork', icon: '💼', regretChange: 10, messageKey: 'msgSkipWork' },
      { id: 'skip-workout', labelKey: 'actSkipWorkout', icon: '🏋️', regretChange: 5, messageKey: 'msgSkipWorkout' },
      { id: 'ignored-responsibilities', labelKey: 'actIgnoredResponsibilities', icon: '🙈', regretChange: 8, messageKey: 'msgIgnoredResponsibilities' },
      { id: 'procrastinated', labelKey: 'actProcrastinated', icon: '⏳', regretChange: 7, messageKey: 'msgProcrastinated' },
      { id: 'hit-snooze', labelKey: 'actHitSnooze', icon: '⏰', regretChange: 5, messageKey: 'msgHitSnooze' },
      { id: 'avoided-hard-task', labelKey: 'actAvoidedHardTask', icon: '😰', regretChange: 7, messageKey: 'msgAvoidedHardTask' },
      { id: 'gave-up-early', labelKey: 'actGaveUpEarly', icon: '🏳️', regretChange: 8, messageKey: 'msgGaveUpEarly' }
    ]
  },
  {
    id: 'sleep',
    nameKey: 'catSleep',
    icon: '🌙',
    color: '#aa44ff',
    activities: [
      { id: 'good-sleep', labelKey: 'actGoodSleep', icon: '😴', regretChange: -5, messageKey: 'msgGoodSleep' },
      { id: 'power-nap', labelKey: 'actPowerNap', icon: '⚡', regretChange: -3, messageKey: 'msgPowerNap' },
      { id: 'stayed-up-late', labelKey: 'actStayedUpLate', icon: '🌃', regretChange: 6, messageKey: 'msgStayedUpLate' },
      { id: 'nap-too-long', labelKey: 'actNapTooLong', icon: '🛏️', regretChange: 4, messageKey: 'msgNapTooLong' },
      { id: 'no-sleep', labelKey: 'actNoSleep', icon: '💀', regretChange: 10, messageKey: 'msgNoSleep' },
      { id: 'screen-before-bed', labelKey: 'actScreenBeforeBed', icon: '📱', regretChange: 4, messageKey: 'msgScreenBeforeBed' }
    ]
  },
  {
    id: 'growth',
    nameKey: 'catGrowth',
    icon: '🧠',
    color: '#ffaa00',
    activities: [
      { id: 'read-book', labelKey: 'actReadBook', icon: '📖', regretChange: -5, messageKey: 'msgReadBook' },
      { id: 'learn-new', labelKey: 'actLearnNew', icon: '💡', regretChange: -6, messageKey: 'msgLearnNew' },
      { id: 'practice-hobby', labelKey: 'actPracticeHobby', icon: '🎨', regretChange: -4, messageKey: 'msgPracticeHobby' },
      { id: 'help-someone', labelKey: 'actHelpSomeone', icon: '🤝', regretChange: -5, messageKey: 'msgHelpSomeone' },
      { id: 'reflect-day', labelKey: 'actReflectDay', icon: '🪞', regretChange: -4, messageKey: 'msgReflectDay' },
      { id: 'set-boundary', labelKey: 'actSetBoundary', icon: '🛡️', regretChange: -3, messageKey: 'msgSetBoundary' },
      { id: 'gratitude', labelKey: 'actGratitude', icon: '🙏', regretChange: -3, messageKey: 'msgGratitude' },
      { id: 'creative-work', labelKey: 'actCreativeWork', icon: '✨', regretChange: -6, messageKey: 'msgCreativeWork' }
    ]
  }
]

// Flatten all activities into a lookup map
const activityMap = {}
categories.forEach(cat => {
  cat.activities.forEach(act => {
    activityMap[act.id] = { ...act, categoryId: cat.id, categoryColor: cat.color }
  })
})

export function getActivityConfig(activityId) {
  const config = activityMap[activityId]
  if (!config) {
    return {
      id: activityId,
      labelKey: activityId,
      icon: '❓',
      regretChange: 0,
      messageKey: '',
      categoryId: 'unknown',
      categoryColor: '#888'
    }
  }
  return config
}

export function getCategoryById(id) {
  return categories.find(c => c.id === id)
}

// Recovery missions mapped to the category that caused the regret
export const recoveryMissions = {
  distractions: [
    { icon: '📵', nameKey: 'recDist1Name', descKey: 'recDist1Desc' },
    { icon: '🧹', nameKey: 'recDist2Name', descKey: 'recDist2Desc' },
    { icon: '📝', nameKey: 'recDist3Name', descKey: 'recDist3Desc' }
  ],
  skipping: [
    { icon: '📖', nameKey: 'recSkip1Name', descKey: 'recSkip1Desc' },
    { icon: '✅', nameKey: 'recSkip2Name', descKey: 'recSkip2Desc' },
    { icon: '📋', nameKey: 'recSkip3Name', descKey: 'recSkip3Desc' }
  ],
  health: [
    { icon: '💪', nameKey: 'recHealth1Name', descKey: 'recHealth1Desc' },
    { icon: '💧', nameKey: 'recHealth2Name', descKey: 'recHealth2Desc' },
    { icon: '🚶', nameKey: 'recHealth3Name', descKey: 'recHealth3Desc' }
  ],
  sleep: [
    { icon: '📵', nameKey: 'recSleep1Name', descKey: 'recSleep1Desc' },
    { icon: '🌬️', nameKey: 'recSleep2Name', descKey: 'recSleep2Desc' },
    { icon: '⏰', nameKey: 'recSleep3Name', descKey: 'recSleep3Desc' }
  ],
  default: [
    { icon: '🎯', nameKey: 'recDefault1Name', descKey: 'recDefault1Desc' },
    { icon: '📝', nameKey: 'recDefault2Name', descKey: 'recDefault2Desc' },
    { icon: '📵', nameKey: 'recDefault3Name', descKey: 'recDefault3Desc' }
  ]
}

export function getRecoveryMissions(categoryId) {
  return recoveryMissions[categoryId] || recoveryMissions.default
}

export function getLastNegativeCategory(decisions) {
  for (let i = decisions.length - 1; i >= 0; i--) {
    const config = getActivityConfig(decisions[i].type)
    if (config.regretChange > 0) return config.categoryId
  }
  return 'default'
}

export function detectPattern(decisions) {
  const { t } = useI18n()
  if (decisions.length < 3) return null
  const last3 = decisions.slice(-3)

  const last3Types = last3.map(d => {
    const config = getActivityConfig(d.type)
    return config.regretChange > 0 ? 'negative' : 'positive'
  })

  if (last3Types.every(t => t === 'negative')) return t('insight3Bad')
  if (last3Types.every(t => t === 'positive')) return t('insight3Good')

  return null
}

export function getInsight(regret, decisions, streak) {
  const { t } = useI18n()
  const pattern = detectPattern(decisions)
  if (pattern) return pattern

  if (regret >= 70) return t('insightOneFromDisaster')
  if (regret >= 50) return t('insightFailAfter2')
  if (regret < 20 && streak >= 3) return t('insightStreak')(streak)
  if (regret < 30) return t('insightStayConsistent')

  const negatives = decisions.filter(d => {
    const config = getActivityConfig(d.type)
    return config.regretChange > 0
  }).length

  if (negatives > 5) return t('insightBadDecisions')(negatives)

  return t('insightEveryDecision')
}

export function getRegretMessage(regret) {
  const { t } = useI18n()
  if (regret >= 80) return t('regretCollapseImminent')
  if (regret >= 60) return t('regretDangerZone')
  if (regret >= 40) return t('regretPressureBuilding')
  if (regret >= 20) return t('regretSlightlyUnstable')
  return t('regretStablePath')
}

export function checkDailyReset(state) {
  const { t } = useI18n()
  const today = new Date().toISOString().split('T')[0]
  if (state.lastCheckIn !== today) {
    return {
      shouldReset: true,
      message: state.regret > 50 ? t('dailyResetDanger') : t('dailyResetSafe')
    }
  }
  return { shouldReset: false, message: null }
}
