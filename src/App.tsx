import React, { useState } from 'react';

type TabId = 'dashboard' | 'transfer' | 'cards' | 'analytics' | 'profile';

interface Transaction {
  id: string;
  merchant: string;
  category: string;
  time: string;
  amount: string;
  isPositive?: boolean;
  icon: string;
  cardUsed?: string;
  status?: string;
}

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1U6mBg_7N18JFpJGgtC8VeAeMkM-jOhP-gXIHSoSo4nNHWtIdV7QgjZkmMxKKp_qQl9pk2y6jAB7bThJgfyLVLzoKK1XI8wE__gQiXkt9XlHh70UY6eGbFzYsORUXR5UyLEmikbfiuMTtc_SnqDCCqDGKCsOTDxnEIYu5gDWsK6vAui5VFLWjb6Ui066-OLwPsbVygyk1fsRcPIiWRujzN-mm03CkIfsIM0_z1AxmiaitUrQoFKNR_b1RU';

const PROFILE_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCCSGKCwQn53KJ2C8lZXxQTElpJyjtlwM_7cAPE4q7jagG8vioPYc7lLGRRQVlhP79nvEC6RuY1VMnxPjlFGCtNGu0T1mwHr8Y6J2fN5aHMp62oeVYIeM4J648_Ea8vFRL03pdAhcCBNoss3Sd69nqK4vHhmSwzfUTwPqHd2YlsLxbQ3nFiMoIFQRpMbsb0peDk0-I5aEYc4LD-_53eQYW5UKZ8e1LJeb2g4S9WuP9gnw56EdOJ5Kje';

const HOLOGRAPHIC_CARD_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC8-_Pb2PRGu06kYwcpyzHmiERBglE-ACoPQbUb5P6IRVzpCVTYrDHRhLNskGUSGvL4Qe4pa2OymNxrNR4U6WULrRzxrv9HUVjgFIDsjp1_91KEJPWpqQGO4OzTUHXzklWUCYHc16oKs7sDdAZJ8xB84OasP9jH6fKUmLEkHQySS4ajE5y2wKlIA9YksPl2SSUItoMa_5GWNmBoBmaET7u1O8Y2fLJ5b-zB3Bv1IQCYCCxgsPszQ-66';

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    merchant: 'Uber Technologies',
    category: 'Transport',
    time: 'Today, 4:15 PM',
    amount: '-$24.50',
    icon: 'directions_car',
    cardUsed: 'Volt Virtual •• 4419',
    status: 'Settled',
  },
  {
    id: 'tx-2',
    merchant: 'Starbucks Reserve',
    category: 'Dining & Drinks',
    time: 'Today, 9:30 AM',
    amount: '-$7.80',
    icon: 'local_cafe',
    cardUsed: 'Apple Pay •• 9842',
    status: 'Settled',
  },
  {
    id: 'tx-3',
    merchant: 'Acme Corp Direct Deposit',
    category: 'Salary Deposit',
    time: 'Yesterday',
    amount: '+$4,850.00',
    isPositive: true,
    icon: 'account_balance',
    cardUsed: 'ACH Direct •• 9842',
    status: 'Cleared',
  },
  {
    id: 'tx-4',
    merchant: 'Apple Store Regent St',
    category: 'Gadgets & Tech',
    time: 'Oct 24',
    amount: '-$199.00',
    icon: 'devices',
    cardUsed: 'Volt Titanium •• 9842',
    status: 'Settled',
  },
];

const EXTRA_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-5',
    merchant: 'Whole Foods Market',
    category: 'Shopping & Retail',
    time: 'Oct 22',
    amount: '-$142.30',
    icon: 'shopping_bag',
    cardUsed: 'Apple Pay •• 9842',
    status: 'Settled',
  },
  {
    id: 'tx-6',
    merchant: 'Seattle City Light',
    category: 'Bills & Utilities',
    time: 'Oct 19',
    amount: '-$118.40',
    icon: 'bolt',
    cardUsed: 'Auto-Pay •• 9842',
    status: 'Settled',
  },
];

const DONUT_SEGMENTS = {
  shopping: {
    id: 'arc-shopping',
    label: 'Shopping',
    fullName: 'Shopping & Retail',
    value: '$1,536.20',
    sub: '40% of Total',
    share: '40%',
    txCount: '28 transactions',
    color: '#00F5A0',
    icon: 'shopping_bag',
    dasharray: '155.82 389.56',
    dashoffset: '0',
    shadow: 'drop-shadow-[0_0_8px_rgba(0,245,160,0.5)]',
  },
  dining: {
    id: 'arc-dining',
    label: 'Dining',
    fullName: 'Dining & Culinary',
    value: '$1,152.15',
    sub: '30% of Total',
    share: '30%',
    txCount: '19 transactions',
    color: '#00D2FF',
    icon: 'restaurant',
    dasharray: '116.87 389.56',
    dashoffset: '-155.82',
    shadow: 'drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]',
  },
  bills: {
    id: 'arc-bills',
    label: 'Bills',
    fullName: 'Bills & Recurring Utilities',
    value: '$768.10',
    sub: '20% of Total',
    share: '20%',
    txCount: '6 transactions',
    color: '#A855F7',
    icon: 'bolt',
    dasharray: '77.91 389.56',
    dashoffset: '-272.69',
    shadow: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]',
  },
  travel: {
    id: 'arc-travel',
    label: 'Travel',
    fullName: 'Travel & Urban Transit',
    value: '$384.05',
    sub: '10% of Total',
    share: '10%',
    txCount: '12 transactions',
    color: '#F59E0B',
    icon: 'commute',
    dasharray: '38.96 389.56',
    dashoffset: '-350.60',
    shadow: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]',
  },
} as const;

type SegmentKey = keyof typeof DONUT_SEGMENTS;

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  // Home Screen State
  const [balance, setBalance] = useState<number>(28450.0);
  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(false);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);
  const [showAllActivity, setShowAllActivity] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Analytics Screen State
  const periods = ['This Month', 'Last 30 Days', 'Q3 Review', 'Year-To-Date'];
  const [periodIndex, setPeriodIndex] = useState<number>(0);
  const [selectedSegment, setSelectedSegment] = useState<SegmentKey | null>(null);
  const [vaultTransferState, setVaultTransferState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [csvExported, setCsvExported] = useState<boolean>(false);

  // Profile Screen State
  const [faceIdEnabled, setFaceIdEnabled] = useState<boolean>(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(true);
  const [lockTimeout, setLockTimeout] = useState<'Immediate' | '1 min' | '5 min'>('Immediate');
  const [dailyLimit, setDailyLimit] = useState<number>(10000);
  const [activeProfileSheet, setActiveProfileSheet] = useState<
    null | 'accounts' | 'limits' | 'privacy' | 'recovery' | 'logout'
  >(null);

  // Notifications Drawer State
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<boolean>(true);

  // Transfer Screen State
  const [transferMode, setTransferMode] = useState<'send' | 'bills' | 'deposit'>('send');
  const [transferAmount, setTransferAmount] = useState<string>('125.00');
  const [selectedRecipient, setSelectedRecipient] = useState<string>('Maya Lin');
  const [transferNote, setTransferNote] = useState<string>('Dinner split & drinks');
  const [transferStatus, setTransferStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Cards Screen State
  const [cardFrozen, setCardFrozen] = useState<boolean>(false);
  const [showCardDetails, setShowCardDetails] = useState<boolean>(false);
  const [contactlessEnabled, setContactlessEnabled] = useState<boolean>(true);
  const [intlPaymentsEnabled, setIntlPaymentsEnabled] = useState<boolean>(true);
  const [copiedCardNumber, setCopiedCardNumber] = useState<boolean>(false);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText('984281729012');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 1800);
  };

  const handleVaultTransfer = () => {
    if (vaultTransferState !== 'idle') return;
    setVaultTransferState('loading');
    setTimeout(() => {
      setVaultTransferState('done');
      setBalance((prev) => prev + 45.0);
      setTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          merchant: 'Volt Rainy Day Vault',
          category: 'AI Smart Savings Transfer',
          time: 'Just now',
          amount: '+$45.00',
          isPositive: true,
          icon: 'lock_clock',
          cardUsed: 'Internal Vault •• 9842',
          status: 'Locked in 4.85% APY Vault',
        },
        ...prev,
      ]);
    }, 900);
  };

  const handleExportCSV = () => {
    const csvRows = [
      ['Category', 'Amount (USD)', 'Share (%)', 'Transactions'],
      ['Shopping & Retail', '1536.20', '40%', '28'],
      ['Dining & Culinary', '1152.15', '30%', '19'],
      ['Bills & Recurring Utilities', '768.10', '20%', '6'],
      ['Travel & Urban Transit', '384.05', '10%', '12'],
    ];
    const csvString = csvRows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'volt-spending-insights-october.csv';
    a.click();
    URL.revokeObjectURL(url);
    setCsvExported(true);
    setTimeout(() => setCsvExported(false), 2200);
  };

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(transferAmount);
    if (isNaN(numericAmount) || numericAmount <= 0 || transferStatus !== 'idle') return;

    setTransferStatus('sending');
    setTimeout(() => {
      setTransferStatus('sent');
      if (transferMode === 'deposit') {
        setBalance((prev) => prev + numericAmount);
        setTransactions((prev) => [
          {
            id: `tx-${Date.now()}`,
            merchant: 'Instant External Deposit',
            category: 'Vault Deposit',
            time: 'Just now',
            amount: `+${formatCurrency(numericAmount)}`,
            isPositive: true,
            icon: 'add_circle',
            cardUsed: 'Chase Private Client •• 3104',
            status: 'Settled Instantly',
          },
          ...prev,
        ]);
      } else {
        setBalance((prev) => Math.max(0, prev - numericAmount));
        setTransactions((prev) => [
          {
            id: `tx-${Date.now()}`,
            merchant: transferMode === 'bills' ? 'Pacific Gas & Electric' : selectedRecipient,
            category: transferMode === 'bills' ? 'Bills & Utilities' : 'Instant Volt Transfer',
            time: 'Just now',
            amount: `-${formatCurrency(numericAmount)}`,
            isPositive: false,
            icon: transferMode === 'bills' ? 'bolt' : 'send',
            cardUsed: 'Volt Checking •• 9842',
            status: 'Settled Instantly',
          },
          ...prev,
        ]);
      }

      setTimeout(() => {
        setTransferStatus('idle');
      }, 1800);
    }, 700);
  };

  const headerSubtitle =
    activeTab === 'analytics'
      ? 'Analytics'
      : activeTab === 'cards'
      ? 'Cards'
      : activeTab === 'transfer'
      ? 'Transfer'
      : 'Profile';

  const displayedTransactions = showAllActivity
    ? [...transactions, ...EXTRA_TRANSACTIONS]
    : transactions;

  return (
    <div className="min-h-screen bg-[#0b0e17] text-on-surface font-body-md text-body-md antialiased selection:bg-primary-container selection:text-on-primary-fixed flex flex-col items-center">
      {/* Mobile Shell Container (centers cleanly on larger viewports while filling mobile edge-to-edge) */}
      <div className="w-full max-w-[440px] min-h-screen bg-surface relative shadow-[0_0_80px_rgba(0,0,0,0.85)] flex flex-col">
        {/* Top Fixed App Header */}
        <header className="fixed top-0 w-full max-w-[440px] z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.15)]">
          <div className="h-16 px-gutter flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-space-sm text-left focus:outline-none group"
            >
              <img
                alt="Volt Bank Logo"
                className="h-8 w-auto object-contain"
                src={LOGO_URL}
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none">
                  Volt
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container">
                  {headerSubtitle}
                </span>
              </div>
            </button>

            <div className="flex items-center gap-space-xs">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => {
                  setNotificationsOpen((prev) => !prev);
                  setUnreadNotifications(false);
                }}
                className="relative flex items-center justify-center w-11 h-11 rounded-full text-on-surface hover:text-primary-container hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {unreadNotifications && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
                )}
              </button>
              <button
                type="button"
                aria-label="Open Profile"
                onClick={() => setActiveTab('profile')}
                className={`flex items-center justify-center p-0.5 rounded-full transition-all ${
                  activeTab === 'profile'
                    ? 'ring-2 ring-primary-container shadow-[0_0_12px_rgba(0,245,160,0.4)]'
                    : 'ring-1 ring-primary-container/30'
                }`}
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  src={PROFILE_AVATAR_URL}
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Notifications Dropdown Sheet */}
        {notificationsOpen && (
          <div className="fixed inset-0 z-50 flex flex-col items-center">
            <div
              className="w-full h-full bg-black/50 backdrop-blur-xs"
              onClick={() => setNotificationsOpen(false)}
            />
            <div className="fixed top-16 w-full max-w-[440px] px-4 pt-2 z-50">
              <div className="rounded-xl bg-surface-container-high p-4 shadow-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-lg text-label-lg text-on-surface">
                    Security & Activity Alerts
                  </span>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-on-surface-variant hover:text-on-surface font-label-sm uppercase"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-surface-container flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container text-[20px] mt-0.5">
                      auto_awesome
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-label-md text-on-surface">Volt AI Savings Surplus</p>
                      <p className="font-body-sm text-on-surface-variant">
                        You spent 15% less on dining out this week. $45 ready to move to Vault.
                      </p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container text-[20px] mt-0.5">
                      verified_user
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-label-md text-on-surface">Quantum Shield Active</p>
                      <p className="font-body-sm text-on-surface-variant">
                        Hardware YubiKey + Face ID verified from Seattle, WA.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SCREEN 1: HOME (DASHBOARD) ==================== */}
        {activeTab === 'dashboard' && (
          <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
            <div className="flex flex-col w-full px-margin pb-6 gap-space-lg">
              {/* Greeting Header Section */}
              <div className="flex items-center justify-between pt-space-xs">
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-xs">
                    <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
                      Good Morning, Alex
                    </h1>
                    <span
                      className="material-symbols-outlined text-primary-container text-[20px] select-none"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                    <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Active Checking • Primary
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="px-2 py-1 rounded-full bg-surface-container-high text-secondary text-label-sm font-label-sm tracking-wide">
                    Tier 1
                  </span>
                </div>
              </div>

              {/* Main Balance Card (Hero Matrix) */}
              <div className="relative w-full rounded-xl p-space-lg bg-surface-container-low shadow-[0_12px_36px_-6px_rgba(0,0,0,0.65)] overflow-hidden">
                {/* Atmospheric Glows */}
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col gap-space-md">
                  {/* Top Meta Details */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                        Total Vault Balance
                      </span>
                      <button
                        type="button"
                        aria-label="Toggle balance visibility"
                        onClick={() => setIsBalanceHidden((prev) => !prev)}
                        className="p-1 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isBalanceHidden ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-primary-container text-label-sm font-label-sm">
                      <span className="material-symbols-outlined text-[14px]">shield</span>
                      <span>4.85% APY</span>
                    </div>
                  </div>

                  {/* Balance Number */}
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="font-numeric-metric text-numeric-metric text-on-surface tracking-tight font-bold">
                        {isBalanceHidden ? '••••••••' : formatCurrency(balance)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center text-primary-container font-label-md text-label-md">
                        <span className="material-symbols-outlined text-[16px]">trending_up</span>
                        +$1,420.50 (+5.2%)
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        this billing cycle
                      </span>
                    </div>
                  </div>

                  {/* Card Meta Bottom: Account Mask & Tag */}
                  <div className="flex items-center justify-between pt-space-xs">
                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded-lg bg-surface-container-high flex items-center gap-1.5">
                        <span className="font-label-sm text-label-sm text-on-surface-variant tracking-widest">
                          •••• 9842
                        </span>
                        <button
                          type="button"
                          aria-label="Copy account number"
                          onClick={handleCopyAccount}
                          className="text-on-surface-variant hover:text-primary-container transition-colors flex items-center"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {copiedAccount ? 'done' : 'content_copy'}
                          </span>
                        </button>
                      </div>
                      <span
                        className={`font-label-sm text-label-sm text-primary-container transition-opacity ${
                          copiedAccount ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        Copied!
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                      FDIC Insured
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Action Matrix */}
              <div className="grid grid-cols-4 gap-space-sm">
                {/* Send */}
                <button
                  type="button"
                  onClick={() => {
                    setTransferMode('send');
                    setActiveTab('transfer');
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all active:scale-95 group"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container shadow-[0_0_16px_-4px_rgba(0,245,160,0.25)] group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">send</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface">Send</span>
                </button>

                {/* Pay Bills */}
                <button
                  type="button"
                  onClick={() => {
                    setTransferMode('bills');
                    setActiveTab('transfer');
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all active:scale-95 group"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-secondary-container shadow-[0_0_16px_-4px_rgba(0,210,255,0.25)] group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">bolt</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface">Pay Bills</span>
                </button>

                {/* Deposit */}
                <button
                  type="button"
                  onClick={() => {
                    setTransferMode('deposit');
                    setActiveTab('transfer');
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all active:scale-95 group"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container shadow-[0_0_16px_-4px_rgba(0,245,160,0.25)] group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">add_circle</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface">Deposit</span>
                </button>

                {/* Cards */}
                <button
                  type="button"
                  onClick={() => setActiveTab('cards')}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all active:scale-95 group"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-secondary-container shadow-[0_0_16px_-4px_rgba(0,210,255,0.25)] group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">credit_card</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface">Cards</span>
                </button>
              </div>

              {/* Visual Asset Showcase */}
              <div
                onClick={() => setActiveTab('cards')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab('cards')}
                className="relative w-full rounded-xl overflow-hidden bg-surface-container-low shadow-md cursor-pointer group"
              >
                <img
                  className="w-full h-28 object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-300"
                  alt="Quantum Fraud Defense holographic card"
                  src={HOLOGRAPHIC_CARD_URL}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/90 via-surface-container-lowest/60 to-transparent p-space-md flex flex-col justify-center">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container">
                    Smart Protection
                  </span>
                  <p className="font-headline-sm text-headline-sm text-on-surface">
                    Quantum Fraud Defense
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Zero unauthorized liability enabled
                  </p>
                </div>
              </div>

              {/* Spend Analytics Snippet */}
              <div className="w-full rounded-xl p-space-md bg-surface-container-low flex flex-col gap-space-sm shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined text-[18px]">pie_chart</span>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface block">
                        Monthly Budget Spent
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        $1,200 / $2,500
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-container/15 text-primary-container font-label-sm text-label-sm font-semibold">
                    On Track
                  </span>
                </div>
                {/* Progress Track */}
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-full bg-primary-container rounded-full shadow-[0_0_12px_rgba(0,245,160,0.8)]"
                    style={{ width: '48%' }}
                  ></div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    48% of cap utilized
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('analytics')}
                    className="font-label-sm text-label-sm text-secondary-container hover:underline flex items-center gap-1"
                  >
                    <span>View Insights</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Recent Activity
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowAllActivity((prev) => !prev)}
                    className="font-label-sm text-label-sm text-secondary-container hover:underline"
                  >
                    {showAllActivity ? 'Show Less' : 'See All'}
                  </button>
                </div>

                {/* Transactions List */}
                <div className="flex flex-col gap-space-xs">
                  {displayedTransactions.map((tx) => (
                    <button
                      key={tx.id}
                      type="button"
                      onClick={() => setSelectedTx(tx)}
                      className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors text-left w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            tx.isPositive
                              ? 'bg-primary-container/20 text-primary-container'
                              : 'bg-surface-container-high text-on-surface'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-lg text-label-lg text-on-surface">
                            {tx.merchant}
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-body-sm text-body-sm ${
                                tx.isPositive ? 'text-primary-container' : 'text-on-surface-variant'
                              }`}
                            >
                              {tx.category}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-surface-container-highest"></span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {tx.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`font-label-lg text-label-lg ${
                          tx.isPositive
                            ? 'text-primary-container font-semibold drop-shadow-[0_0_8px_rgba(0,245,160,0.5)]'
                            : 'text-on-surface'
                        }`}
                      >
                        {tx.amount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ==================== SCREEN 2: ANALYTICS (SPENDING INSIGHTS) ==================== */}
        {activeTab === 'analytics' && (
          <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
            <div className="flex flex-col w-full px-gutter space-y-space-md pb-6">
              {/* Sub-Header Controls & Timeframe Selector */}
              <div className="flex items-center justify-between pt-space-sm">
                <div className="flex flex-col">
                  <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
                    Spending Insights
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-space-xs mt-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                    AI sync live • Updated 4m ago
                  </span>
                </div>
                {/* Dropdown Filter Pill */}
                <button
                  type="button"
                  onClick={() => setPeriodIndex((prev) => (prev + 1) % periods.length)}
                  className="relative group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface hover:text-primary-container transition-all active:scale-95 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary-container">
                    calendar_today
                  </span>
                  <span className="font-label-md text-label-md">{periods[periodIndex]}</span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    expand_more
                  </span>
                </button>
              </div>

              {/* Hero Total Spending Summary Card with Ambient Glow */}
              <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md shadow-md">
                <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
                <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Total Outflow • October
                    </span>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container/40 text-error">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span>
                      <span className="font-label-sm text-label-sm font-semibold">
                        +4.2% vs Sep
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-numeric-metric text-numeric-metric text-on-surface tracking-tight">
                      $3,840
                      <span className="text-on-surface-variant font-headline-sm text-headline-sm">
                        .50
                      </span>
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      / $4,500 budget
                    </span>
                  </div>
                  {/* Linear Micro Progress of Total Budget */}
                  <div className="w-full space-y-1.5 pt-1">
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
                      <div
                        className="bg-primary-container h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                      <span>85% of monthly target consumed</span>
                      <span className="text-primary-container font-semibold">
                        $659.50 safe limit
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive SVG Radial Graph Showcase Card */}
              <div className="relative rounded-xl bg-surface-container p-space-md shadow-md flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary-container text-[18px]">
                      pie_chart
                    </span>
                    <span className="font-label-lg text-label-lg text-on-surface">
                      Category Allocation
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedSegment(null)}
                    className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary-container transition-colors"
                  >
                    {selectedSegment ? 'Reset view' : 'Tap segment to isolate'}
                  </button>
                </div>

                {/* Modern SVG Donut Chart with Neon Luminescence */}
                <div
                  onDoubleClick={() => setSelectedSegment(null)}
                  className="relative w-56 h-56 flex items-center justify-center my-1"
                >
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                    <circle
                      className="text-surface-container-highest"
                      cx="80"
                      cy="80"
                      fill="transparent"
                      r="62"
                      stroke="currentColor"
                      strokeWidth="15"
                    ></circle>
                    {(Object.keys(DONUT_SEGMENTS) as SegmentKey[]).map((key) => {
                      const seg = DONUT_SEGMENTS[key];
                      const isDimmed = selectedSegment !== null && selectedSegment !== key;
                      return (
                        <circle
                          key={seg.id}
                          onClick={() =>
                            setSelectedSegment((prev) => (prev === key ? null : key))
                          }
                          className={`transition-all duration-500 cursor-pointer filter ${seg.shadow}`}
                          cx="80"
                          cy="80"
                          fill="transparent"
                          r="62"
                          stroke={seg.color}
                          strokeDasharray={seg.dasharray}
                          strokeDashoffset={seg.dashoffset}
                          strokeLinecap="round"
                          strokeWidth="15"
                          style={{ opacity: isDimmed ? 0.35 : 1 }}
                        ></circle>
                      );
                    })}
                  </svg>

                  {/* Center Dynamic Target Metric */}
                  <button
                    type="button"
                    onClick={() => setSelectedSegment(null)}
                    className="absolute flex flex-col items-center justify-center text-center select-none focus:outline-none"
                  >
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                      {selectedSegment ? DONUT_SEGMENTS[selectedSegment].label : 'Total'}
                    </span>
                    <span className="font-headline-md text-headline-md text-on-surface">
                      {selectedSegment ? DONUT_SEGMENTS[selectedSegment].value : '$3,840'}
                    </span>
                    <span className="font-label-sm text-label-sm text-primary-container">
                      {selectedSegment ? DONUT_SEGMENTS[selectedSegment].sub : '4 Categories'}
                    </span>
                  </button>
                </div>

                {/* Quick Pill Legend Strip */}
                <div className="grid grid-cols-2 gap-x-space-md gap-y-2 w-full pt-space-xs mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedSegment((prev) => (prev === 'shopping' ? null : 'shopping'))
                    }
                    className={`flex items-center gap-2 p-1.5 rounded-lg bg-surface-container-low text-left transition-all ${
                      selectedSegment === 'shopping' ? 'ring-1 ring-[#00F5A0]' : ''
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F5A0] shadow-[0_0_6px_#00F5A0]"></span>
                    <span className="font-body-sm text-body-sm text-on-surface flex-1 truncate">
                      Shopping
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      40%
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedSegment((prev) => (prev === 'dining' ? null : 'dining'))
                    }
                    className={`flex items-center gap-2 p-1.5 rounded-lg bg-surface-container-low text-left transition-all ${
                      selectedSegment === 'dining' ? 'ring-1 ring-[#00D2FF]' : ''
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] shadow-[0_0_6px_#00D2FF]"></span>
                    <span className="font-body-sm text-body-sm text-on-surface flex-1 truncate">
                      Dining
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      30%
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedSegment((prev) => (prev === 'bills' ? null : 'bills'))
                    }
                    className={`flex items-center gap-2 p-1.5 rounded-lg bg-surface-container-low text-left transition-all ${
                      selectedSegment === 'bills' ? 'ring-1 ring-[#A855F7]' : ''
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] shadow-[0_0_6px_#A855F7]"></span>
                    <span className="font-body-sm text-body-sm text-on-surface flex-1 truncate">
                      Bills &amp; Utils
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      20%
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedSegment((prev) => (prev === 'travel' ? null : 'travel'))
                    }
                    className={`flex items-center gap-2 p-1.5 rounded-lg bg-surface-container-low text-left transition-all ${
                      selectedSegment === 'travel' ? 'ring-1 ring-[#F59E0B]' : ''
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_6px_#F59E0B]"></span>
                    <span className="font-body-sm text-body-sm text-on-surface flex-1 truncate">
                      Travel
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      10%
                    </span>
                  </button>
                </div>
              </div>

              {/* AI Smart Insight Delight Box */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-low p-space-md shadow-md shadow-primary-container/5">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container shadow-[0_0_16px_rgba(0,245,160,0.3)]">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-primary-container flex items-center gap-1">
                        Volt AI • Smart Savings Tip
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Just now
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface leading-snug">
                      You spent{' '}
                      <span className="text-primary-container font-semibold">15% less</span> on
                      dining out this week. Tap to transfer your{' '}
                      <span className="text-on-surface font-semibold">$45</span> surplus to your
                      rainy day Vault.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        disabled={vaultTransferState !== 'idle'}
                        onClick={handleVaultTransfer}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-label-lg text-label-lg active:scale-95 transition-all shadow-[0_0_16px_rgba(0,245,160,0.35)] ${
                          vaultTransferState === 'loading'
                            ? 'bg-surface-container-highest text-on-surface'
                            : 'bg-primary-container text-on-primary-fixed'
                        }`}
                      >
                        {vaultTransferState === 'idle' && (
                          <>
                            <span className="material-symbols-outlined text-[18px]">
                              lock_clock
                            </span>
                            <span>Move $45 to Vault</span>
                          </>
                        )}
                        {vaultTransferState === 'loading' && (
                          <>
                            <span className="material-symbols-outlined text-[18px] animate-spin">
                              sync
                            </span>
                            <span>Securing to Vault...</span>
                          </>
                        )}
                        {vaultTransferState === 'done' && (
                          <>
                            <span className="material-symbols-outlined text-[18px] text-on-primary-fixed">
                              check_circle
                            </span>
                            <span>$45 Locked in Vault!</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Category Breakdown List */}
              <div className="space-y-space-sm pt-space-xs">
                <div className="flex items-center justify-between px-1">
                  <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                    Category Breakdown
                  </span>
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider font-semibold cursor-pointer hover:underline"
                  >
                    {csvExported ? 'CSV Downloaded ✓' : 'Export CSV'}
                  </button>
                </div>

                {/* Category 1: Shopping */}
                <div
                  onClick={() =>
                    setSelectedSegment((prev) => (prev === 'shopping' ? null : 'shopping'))
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    setSelectedSegment((prev) => (prev === 'shopping' ? null : 'shopping'))
                  }
                  className={`p-space-md rounded-xl bg-surface-container space-y-space-sm shadow-sm active:bg-surface-container-high transition-all cursor-pointer ${
                    selectedSegment === 'shopping' ? 'ring-1 ring-[#00F5A0]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00F5A0]/15 flex items-center justify-center text-[#00F5A0] shadow-[0_0_12px_rgba(0,245,160,0.25)]">
                        <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface">
                          Shopping &amp; Retail
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          28 transactions
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        $1,536.20
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#00F5A0]/10 text-[#00F5A0] font-label-sm text-label-sm">
                        40% share
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="bg-[#00F5A0] h-full rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>

                {/* Category 2: Dining */}
                <div
                  onClick={() =>
                    setSelectedSegment((prev) => (prev === 'dining' ? null : 'dining'))
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    setSelectedSegment((prev) => (prev === 'dining' ? null : 'dining'))
                  }
                  className={`p-space-md rounded-xl bg-surface-container space-y-space-sm shadow-sm active:bg-surface-container-high transition-all cursor-pointer ${
                    selectedSegment === 'dining' ? 'ring-1 ring-[#00D2FF]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00D2FF]/15 flex items-center justify-center text-[#00D2FF] shadow-[0_0_12px_rgba(0,210,255,0.25)]">
                        <span className="material-symbols-outlined text-[20px]">restaurant</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface">
                          Dining &amp; Culinary
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          19 transactions
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        $1,152.15
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#00D2FF]/10 text-[#00D2FF] font-label-sm text-label-sm">
                        30% share
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="bg-[#00D2FF] h-full rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>

                {/* Category 3: Bills & Utilities */}
                <div
                  onClick={() =>
                    setSelectedSegment((prev) => (prev === 'bills' ? null : 'bills'))
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    setSelectedSegment((prev) => (prev === 'bills' ? null : 'bills'))
                  }
                  className={`p-space-md rounded-xl bg-surface-container space-y-space-sm shadow-sm active:bg-surface-container-high transition-all cursor-pointer ${
                    selectedSegment === 'bills' ? 'ring-1 ring-[#A855F7]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#A855F7]/15 flex items-center justify-center text-[#A855F7] shadow-[0_0_12px_rgba(168,85,247,0.25)]">
                        <span className="material-symbols-outlined text-[20px]">bolt</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface">
                          Bills &amp; Recurring Utilities
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          6 transactions
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        $768.10
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#A855F7]/10 text-[#A855F7] font-label-sm text-label-sm">
                        20% share
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="bg-[#A855F7] h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>

                {/* Category 4: Travel & Transit */}
                <div
                  onClick={() =>
                    setSelectedSegment((prev) => (prev === 'travel' ? null : 'travel'))
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    setSelectedSegment((prev) => (prev === 'travel' ? null : 'travel'))
                  }
                  className={`p-space-md rounded-xl bg-surface-container space-y-space-sm shadow-sm active:bg-surface-container-high transition-all cursor-pointer ${
                    selectedSegment === 'travel' ? 'ring-1 ring-[#F59E0B]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/15 flex items-center justify-center text-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                        <span className="material-symbols-outlined text-[20px]">commute</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface">
                          Travel &amp; Urban Transit
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          12 transactions
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        $384.05
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] font-label-sm text-label-sm">
                        10% share
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>

              {/* Peer Comparison Milestone Badge Card */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-secondary-container/15 flex items-center justify-center text-secondary-container">
                  <span className="material-symbols-outlined text-[22px]">insights</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-label-lg text-label-lg text-on-surface">
                    Benchmark Comparison
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    You&apos;re pacing in the{' '}
                    <strong className="text-primary-container">top 8%</strong> most disciplined
                    savers in Seattle this cycle.
                  </span>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ==================== SCREEN 3: PROFILE ==================== */}
        {activeTab === 'profile' && (
          <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
            <div className="flex flex-col w-full px-margin pb-6 gap-space-lg">
              {/* Profile Header Hero Card */}
              <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-lg shadow-xl">
                <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-secondary-container/10 blur-2xl pointer-events-none"></div>
                <div className="relative flex flex-col items-center text-center">
                  {/* Avatar with Pulsing Emerald Halo Frame */}
                  <div className="relative mb-space-md">
                    <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary-container via-secondary-container to-primary-container shadow-[0_0_24px_-2px_rgba(0,245,160,0.45)]">
                      <img
                        alt="Alex Rivera Profile Portrait"
                        className="w-full h-full rounded-full object-cover"
                        src={PROFILE_AVATAR_URL}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-md">
                      <span className="w-3.5 h-3.5 rounded-full bg-primary-container inline-block"></span>
                    </div>
                  </div>
                  {/* User Identification & Tier Badge */}
                  <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
                    Alex Rivera
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                    alex.rivera@volt.bank
                  </p>
                  {/* Tier Badge with Metallic Sheen */}
                  <div className="mt-space-sm inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high shadow-inner">
                    <span
                      className="material-symbols-outlined text-[16px] text-primary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      workspace_premium
                    </span>
                    <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase">
                      Tier: Volt Gold Member
                    </span>
                  </div>
                  {/* Account Metadata Snippet */}
                  <div className="mt-space-md pt-space-sm flex items-center justify-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-outline">
                      verified_user
                    </span>
                    <span>Account: **** 9842</span>
                    <span className="opacity-40">•</span>
                    <span>Member since 2022</span>
                  </div>
                </div>
              </div>

              {/* Security Protocol Quick Stats / Bento Highlight */}
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="rounded-xl bg-surface-container p-space-md flex flex-col gap-1 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Shield Health
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-primary-container">
                      shield_with_heart
                    </span>
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface mt-1">
                    {faceIdEnabled && twoFactorEnabled ? 'Optimal' : 'Standard'}
                  </div>
                  <span className="font-body-sm text-body-sm text-primary-fixed">
                    {faceIdEnabled && twoFactorEnabled ? '100% Protected' : '85% Protected'}
                  </span>
                </div>
                <div className="rounded-xl bg-surface-container p-space-md flex flex-col gap-1 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Vault Auth
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-secondary-container">
                      fingerprint
                    </span>
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface mt-1">
                    {twoFactorEnabled ? 'Multi-Key' : 'Single-Key'}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {faceIdEnabled ? 'Face + YubiKey' : 'Passcode Only'}
                  </span>
                </div>
              </div>

              {/* Primary Security Settings Group */}
              <div className="flex flex-col gap-space-xs">
                <div className="px-space-xs pb-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                    Security &amp; Authorization
                  </span>
                </div>
                <div className="rounded-xl bg-surface-container overflow-hidden shadow-lg flex flex-col">
                  {/* 1. Biometrics Login (Face ID) */}
                  <div className="p-space-md flex items-center justify-between gap-space-md bg-surface-container active:bg-surface-container-high transition-colors">
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container shrink-0 shadow-inner">
                        <span className="material-symbols-outlined text-[22px]">face</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface truncate">
                          Biometrics Login (Face ID)
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Biometric quick authentication
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={faceIdEnabled}
                      onClick={() => setFaceIdEnabled((prev) => !prev)}
                      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                        faceIdEnabled
                          ? 'bg-primary-container shadow-[0_0_12px_rgba(0,245,160,0.5)]'
                          : 'bg-surface-container-highest'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-surface-container-lowest shadow-md transition duration-200 ease-in-out my-0.5 ml-0.5 ${
                          faceIdEnabled ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      ></span>
                    </button>
                  </div>

                  <div className="h-[1px] w-full bg-surface-container-highest/40"></div>

                  {/* 2. Two-Factor Authentication (2FA) */}
                  <div className="p-space-md flex items-center justify-between gap-space-md bg-surface-container active:bg-surface-container-high transition-colors">
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container shrink-0 shadow-inner">
                        <span className="material-symbols-outlined text-[22px]">security</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface truncate">
                          Two-Factor Authentication
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                          Hardware token &amp; Authenticator app
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={twoFactorEnabled}
                      onClick={() => setTwoFactorEnabled((prev) => !prev)}
                      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                        twoFactorEnabled
                          ? 'bg-primary-container shadow-[0_0_12px_rgba(0,245,160,0.5)]'
                          : 'bg-surface-container-highest'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-surface-container-lowest shadow-md transition duration-200 ease-in-out my-0.5 ml-0.5 ${
                          twoFactorEnabled ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      ></span>
                    </button>
                  </div>

                  <div className="h-[1px] w-full bg-surface-container-highest/40"></div>

                  {/* 3. Connected Accounts & Bank Links */}
                  <button
                    type="button"
                    onClick={() => setActiveProfileSheet('accounts')}
                    className="p-space-md flex items-center justify-between gap-space-md bg-surface-container hover:bg-surface-container-high active:bg-surface-container-highest transition-colors cursor-pointer text-left w-full"
                  >
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary-container shrink-0 shadow-inner">
                        <span className="material-symbols-outlined text-[22px]">hub</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface truncate">
                          Connected Accounts &amp; Bank Links
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                          3 external accounts linked
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant shrink-0">
                      <span className="font-label-sm text-label-sm text-primary-container bg-surface-container-highest px-2 py-0.5 rounded-full">
                        3 Linked
                      </span>
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </div>
                  </button>

                  <div className="h-[1px] w-full bg-surface-container-highest/40"></div>

                  {/* 4. Transaction Limits & Alerts */}
                  <button
                    type="button"
                    onClick={() => setActiveProfileSheet('limits')}
                    className="p-space-md flex items-center justify-between gap-space-md bg-surface-container hover:bg-surface-container-high active:bg-surface-container-highest transition-colors cursor-pointer text-left w-full"
                  >
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-fixed shrink-0 shadow-inner">
                        <span className="material-symbols-outlined text-[22px]">tune</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface truncate">
                          Transaction Limits &amp; Alerts
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                          Daily limit: ${dailyLimit.toLocaleString()} • Instant push alerts
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-on-surface-variant shrink-0">
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* App Preferences Group */}
              <div className="flex flex-col gap-space-xs">
                <div className="px-space-xs pb-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                    System Preferences
                  </span>
                </div>
                <div className="rounded-xl bg-surface-container overflow-hidden shadow-lg flex flex-col">
                  {/* 5. Privacy & Data Sharing */}
                  <button
                    type="button"
                    onClick={() => setActiveProfileSheet('privacy')}
                    className="p-space-md flex items-center justify-between gap-space-md bg-surface-container hover:bg-surface-container-high active:bg-surface-container-highest transition-colors cursor-pointer text-left w-full"
                  >
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary-fixed shrink-0 shadow-inner">
                        <span className="material-symbols-outlined text-[22px]">shield_locked</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface truncate">
                          Privacy &amp; Data Sharing
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                          Zero third-party telemetry enabled
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-on-surface-variant shrink-0">
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </div>
                  </button>

                  <div className="h-[1px] w-full bg-surface-container-highest/40"></div>

                  {/* 6. App Lock Timeout */}
                  <button
                    type="button"
                    onClick={() =>
                      setLockTimeout((prev) =>
                        prev === 'Immediate' ? '1 min' : prev === '1 min' ? '5 min' : 'Immediate'
                      )
                    }
                    className="p-space-md flex items-center justify-between gap-space-md bg-surface-container hover:bg-surface-container-high active:bg-surface-container-highest transition-colors cursor-pointer text-left w-full"
                  >
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary-fixed-dim shrink-0 shadow-inner">
                        <span className="material-symbols-outlined text-[22px]">timer</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface truncate">
                          App Lock Timeout
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                          Requires Face ID {lockTimeout.toLowerCase()} upon exit
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="font-label-sm text-label-sm text-primary-container bg-surface-container-highest px-2.5 py-1 rounded-full font-semibold">
                        {lockTimeout}
                      </span>
                      <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                        chevron_right
                      </span>
                    </div>
                  </button>

                  <div className="h-[1px] w-full bg-surface-container-highest/40"></div>

                  {/* Recovery Keys Vault */}
                  <button
                    type="button"
                    onClick={() => setActiveProfileSheet('recovery')}
                    className="p-space-md flex items-center justify-between gap-space-md bg-surface-container hover:bg-surface-container-high active:bg-surface-container-highest transition-colors cursor-pointer text-left w-full"
                  >
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-inner">
                        <span className="material-symbols-outlined text-[22px]">key</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface truncate">
                          Emergency Recovery Keys
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                          Stored offline in encrypted cloud vault
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-on-surface-variant shrink-0">
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Sign Out & Footer Section */}
              <div className="flex flex-col items-center gap-space-md pt-space-xs">
                <button
                  type="button"
                  onClick={() => setActiveProfileSheet('logout')}
                  className="w-full flex items-center justify-center gap-space-sm h-13 py-3.5 px-space-lg rounded-xl bg-error-container/20 text-error hover:bg-error-container/30 active:scale-[0.98] transition-all duration-150 shadow-md"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  <span className="font-label-lg text-label-lg">Log Out of Volt Bank</span>
                </button>
                <div className="flex flex-col items-center text-center gap-1">
                  <p className="font-body-sm text-body-sm text-on-surface-variant opacity-80">
                    Volt Bank v2.4.1 (Build 890) • Bank with Confidence
                  </p>
                  <div className="flex items-center gap-1.5 text-outline text-[11px] font-label-sm">
                    <span className="material-symbols-outlined text-[13px] text-primary-container">
                      lock
                    </span>
                    <span>End-to-End Quantum Encrypted Session</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ==================== SCREEN 4: TRANSFER & PAYMENTS ==================== */}
        {activeTab === 'transfer' && (
          <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
            <div className="flex flex-col w-full px-margin pb-6 gap-space-md">
              <div className="flex items-center justify-between pt-space-xs">
                <div>
                  <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
                    Instant Move
                  </h1>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Zero-fee FedNow &amp; Quantum peer rails
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary-container font-label-sm">
                  {formatCurrency(balance)} Avail
                </span>
              </div>

              {/* Mode Switcher */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-surface-container-low">
                {(['send', 'bills', 'deposit'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTransferMode(m)}
                    className={`py-2 rounded-lg font-label-md capitalize transition-all ${
                      transferMode === m
                        ? 'bg-primary-container text-on-primary-fixed shadow-[0_0_12px_rgba(0,245,160,0.3)]'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {m === 'send' ? 'Send Money' : m === 'bills' ? 'Pay Bills' : 'Deposit'}
                  </button>
                ))}
              </div>

              {/* Recipients Strip */}
              {transferMode === 'send' && (
                <div className="space-y-2">
                  <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">
                    Recent Quantum Peers
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {['Maya Lin', 'Devon Brooks', 'Elena Vance'].map((person) => (
                      <button
                        key={person}
                        type="button"
                        onClick={() => setSelectedRecipient(person)}
                        className={`p-2.5 rounded-xl flex flex-col items-center gap-1 transition-all ${
                          selectedRecipient === person
                            ? 'bg-surface-container-high ring-1 ring-primary-container text-primary-container'
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-headline-sm text-sm text-on-surface">
                          {person
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <span className="font-label-sm truncate w-full text-center">{person}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Amount Entry Card */}
              <form
                onSubmit={handleExecuteTransfer}
                className="rounded-xl bg-surface-container p-space-md space-y-4 shadow-md"
              >
                <div className="flex flex-col items-center py-2">
                  <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">
                    {transferMode === 'deposit'
                      ? 'Pull from Chase Private Client •• 3104'
                      : transferMode === 'bills'
                      ? 'Pay Pacific Gas & Electric'
                      : `Sending to ${selectedRecipient}`}
                  </span>
                  <div className="flex items-baseline justify-center gap-1 mt-2">
                    <span className="font-headline-md text-primary-container">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      className="w-40 bg-transparent text-center font-numeric-metric text-numeric-metric text-on-surface focus:outline-none border-b border-surface-container-highest focus:border-primary-container"
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    {['25.00', '50.00', '125.00', '500.00'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setTransferAmount(preset)}
                        className="px-2.5 py-1 rounded-full bg-surface-container-high font-label-sm text-on-surface-variant hover:text-primary-container transition-colors"
                      >
                        +${preset.split('.')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-label-sm uppercase tracking-wider text-on-surface-variant">
                    Memo / Reference
                  </label>
                  <input
                    type="text"
                    value={transferNote}
                    onChange={(e) => setTransferNote(e.target.value)}
                    placeholder="Add encrypted note..."
                    className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md border border-white/10 focus:outline-none focus:border-secondary-container"
                  />
                </div>

                <button
                  type="submit"
                  disabled={transferStatus !== 'idle'}
                  className="w-full py-3.5 rounded-xl bg-primary-container text-on-primary-fixed font-label-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,160,0.35)] active:scale-98 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {transferStatus === 'sent'
                      ? 'check_circle'
                      : transferStatus === 'sending'
                      ? 'sync'
                      : 'bolt'}
                  </span>
                  <span>
                    {transferStatus === 'sent'
                      ? 'Settlement Confirmed!'
                      : transferStatus === 'sending'
                      ? 'Authorizing Quantum Rail...'
                      : `${
                          transferMode === 'deposit'
                            ? 'Instant Deposit'
                            : transferMode === 'bills'
                            ? 'Authorize Bill Pay'
                            : 'Send Instantly'
                        } $${transferAmount || '0.00'}`}
                  </span>
                </button>
              </form>
            </div>
          </main>
        )}

        {/* ==================== SCREEN 5: CARDS ==================== */}
        {activeTab === 'cards' && (
          <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
            <div className="flex flex-col w-full px-margin pb-6 gap-space-md">
              <div className="flex items-center justify-between pt-space-xs">
                <div>
                  <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
                    Virtual &amp; Titanium Cards
                  </h1>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Dynamic CVV • Zero foreign exchange fees
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full font-label-sm ${
                    cardFrozen
                      ? 'bg-error-container/40 text-error'
                      : 'bg-primary-container/15 text-primary-container'
                  }`}
                >
                  {cardFrozen ? 'Card Frozen' : 'Active'}
                </span>
              </div>

              {/* Interactive Holographic Card Preview */}
              <div
                className={`relative rounded-2xl p-space-lg overflow-hidden shadow-2xl transition-all duration-300 ${
                  cardFrozen ? 'opacity-60 grayscale' : ''
                }`}
                style={{
                  background:
                    'linear-gradient(135deg, #181b25 0%, #10131c 55%, rgba(0,245,160,0.18) 100%)',
                }}
              >
                <img
                  src={HOLOGRAPHIC_CARD_URL}
                  alt="Volt Titanium Card"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none"
                />
                <div className="relative z-10 flex flex-col justify-between h-44">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-on-surface">Volt Titanium</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary-container font-label-sm">
                        Virtual + Physical
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-primary-container text-[24px]">
                      contactless
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-headline-sm tracking-widest text-on-surface font-mono">
                        {showCardDetails ? '4892  7710  3384  9842' : '••••  ••••  ••••  9842'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText('4892771033849842');
                          setCopiedCardNumber(true);
                          setTimeout(() => setCopiedCardNumber(false), 1600);
                        }}
                        className="text-primary-container hover:underline font-label-sm"
                      >
                        {copiedCardNumber ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="flex items-center gap-6 text-on-surface-variant font-label-sm">
                      <span>EXP {showCardDetails ? '09/29' : '••/••'}</span>
                      <span>CVV {showCardDetails ? '841' : '•••'}</span>
                      <span className="text-primary-container">ALEX RIVERA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Quick Controls */}
              <div className="grid grid-cols-2 gap-space-sm">
                <button
                  type="button"
                  onClick={() => setShowCardDetails((prev) => !prev)}
                  className="p-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center gap-2 font-label-md text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-primary-container text-[20px]">
                    {showCardDetails ? 'visibility_off' : 'visibility'}
                  </span>
                  <span>{showCardDetails ? 'Hide Numbers' : 'Reveal Details'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCardFrozen((prev) => !prev)}
                  className={`p-3.5 rounded-xl flex items-center justify-center gap-2 font-label-md transition-colors ${
                    cardFrozen
                      ? 'bg-primary-container text-on-primary-fixed'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">ac_unit</span>
                  <span>{cardFrozen ? 'Unfreeze Card' : 'Freeze Card'}</span>
                </button>
              </div>

              {/* Card Security Toggles */}
              <div className="rounded-xl bg-surface-container overflow-hidden divide-y divide-surface-container-highest/40">
                <div className="p-space-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined text-[20px]">tap_and_play</span>
                    </div>
                    <div>
                      <p className="font-label-lg text-on-surface">Contactless &amp; Apple Pay</p>
                      <p className="font-body-sm text-on-surface-variant">
                        NFC tap-to-pay &amp; mobile wallet
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={contactlessEnabled}
                    onClick={() => setContactlessEnabled((prev) => !prev)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors ${
                      contactlessEnabled ? 'bg-primary-container' : 'bg-surface-container-highest'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-surface-container-lowest my-0.5 ml-0.5 transition ${
                        contactlessEnabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-space-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary-container">
                      <span className="material-symbols-outlined text-[20px]">public</span>
                    </div>
                    <div>
                      <p className="font-label-lg text-on-surface">International Routing</p>
                      <p className="font-body-sm text-on-surface-variant">
                        Zero-markup interbank FX rates
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={intlPaymentsEnabled}
                    onClick={() => setIntlPaymentsEnabled((prev) => !prev)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors ${
                      intlPaymentsEnabled ? 'bg-primary-container' : 'bg-surface-container-highest'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-surface-container-lowest my-0.5 ml-0.5 transition ${
                        intlPaymentsEnabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ==================== TRANSACTION DETAIL MODAL ==================== */}
        {selectedTx && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-[440px] rounded-t-2xl bg-surface-container-high p-space-lg space-y-4 border-t border-primary-container/20 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="font-label-sm uppercase tracking-wider text-primary-container">
                  Verified Transaction Receipt
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedTx(null)}
                  className="text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[24px]">{selectedTx.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-headline-sm text-on-surface">{selectedTx.merchant}</h3>
                  <p className="font-body-sm text-on-surface-variant">
                    {selectedTx.category} • {selectedTx.time}
                  </p>
                </div>
                <span
                  className={`font-headline-md ${
                    selectedTx.isPositive ? 'text-primary-container' : 'text-on-surface'
                  }`}
                >
                  {selectedTx.amount}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container space-y-2 font-body-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Settlement Status</span>
                  <span className="text-primary-container font-semibold">
                    {selectedTx.status || 'Settled'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Payment Method</span>
                  <span className="text-on-surface">
                    {selectedTx.cardUsed || 'Volt Checking •• 9842'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="w-full py-3 rounded-xl bg-primary-container text-on-primary-fixed font-label-lg"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* ==================== PROFILE SUB-MODALS ==================== */}
        {activeProfileSheet && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-[440px] rounded-t-2xl bg-surface-container-high p-space-lg space-y-4 border-t border-primary-container/20 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-on-surface">
                  {activeProfileSheet === 'accounts' && 'Connected External Accounts'}
                  {activeProfileSheet === 'limits' && 'Transaction Limits & Alerts'}
                  {activeProfileSheet === 'privacy' && 'Zero-Telemetry Privacy Shield'}
                  {activeProfileSheet === 'recovery' && 'Emergency Recovery Vault'}
                  {activeProfileSheet === 'logout' && 'Session Security Check'}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveProfileSheet(null)}
                  className="text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {activeProfileSheet === 'accounts' && (
                <div className="space-y-2">
                  {[
                    { name: 'Chase Private Client', mask: '•• 3104', status: 'Plaid Live Sync' },
                    { name: 'Fidelity Cash Management', mask: '•• 8821', status: 'Instant ACH' },
                    { name: 'Coinbase Prime Vault', mask: '•• 0944', status: 'Verified Bridge' },
                  ].map((acc) => (
                    <div
                      key={acc.name}
                      className="p-3 rounded-xl bg-surface-container flex items-center justify-between"
                    >
                      <div>
                        <p className="font-label-lg text-on-surface">{acc.name}</p>
                        <p className="font-body-sm text-on-surface-variant">
                          {acc.mask} • {acc.status}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-primary-container/15 text-primary-container font-label-sm">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeProfileSheet === 'limits' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-body-md text-on-surface-variant">
                      Daily Outbound Cap
                    </span>
                    <span className="font-headline-sm text-primary-container">
                      ${dailyLimit.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2500}
                    max={25000}
                    step={2500}
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(Number(e.target.value))}
                    className="w-full accent-[#00f5a0]"
                  />
                  <p className="font-body-sm text-on-surface-variant">
                    Instant push alerts trigger on all card &amp; wire activity over $1.00.
                  </p>
                </div>
              )}

              {activeProfileSheet === 'privacy' && (
                <p className="font-body-md text-on-surface-variant">
                  Volt Bank enforces hardware-isolated zero third-party telemetry. Your transaction
                  graph is encrypted with your client key and never shared with ad networks.
                </p>
              )}

              {activeProfileSheet === 'recovery' && (
                <div className="p-3 rounded-xl bg-surface-container space-y-1">
                  <p className="font-label-md text-primary-container">
                    24-Word Quantum Shard Verified
                  </p>
                  <p className="font-body-sm text-on-surface-variant">
                    Last hardware integrity check: Today at 08:42 AM PST with YubiKey 5C NFC.
                  </p>
                </div>
              )}

              {activeProfileSheet === 'logout' && (
                <div className="space-y-3">
                  <p className="font-body-md text-on-surface-variant">
                    Your Quantum Encrypted Session is currently locked to Alex Rivera&apos;s
                    Passkey. Switching tabs or locking will preserve your vault state.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveProfileSheet(null);
                      setActiveTab('dashboard');
                    }}
                    className="w-full py-3 rounded-xl bg-error-container text-on-error-container font-label-lg"
                  >
                    Lock &amp; Return to Home
                  </button>
                </div>
              )}

              {activeProfileSheet !== 'logout' && (
                <button
                  type="button"
                  onClick={() => setActiveProfileSheet(null)}
                  className="w-full py-3 rounded-xl bg-primary-container text-on-primary-fixed font-label-lg"
                >
                  Save &amp; Close
                </button>
              )}
            </div>
          </div>
        )}

        {/* ==================== BOTTOM NAVIGATION BAR ==================== */}
        <nav className="fixed bottom-0 w-full max-w-[440px] z-50 pb-safe bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-around h-16 px-space-xs">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-space-xs transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'text-primary-container [text-shadow:0_0_16px_rgba(0,245,160,0.65)] scale-105'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
              <span className="font-label-sm text-label-sm">Home</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('transfer')}
              className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-space-xs transition-all duration-200 ${
                activeTab === 'transfer'
                  ? 'text-primary-container [text-shadow:0_0_16px_rgba(0,245,160,0.65)] scale-105'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">swap_horiz</span>
              <span className="font-label-sm text-label-sm">Transfer</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('cards')}
              className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-space-xs transition-all duration-200 ${
                activeTab === 'cards'
                  ? 'text-primary-container [text-shadow:0_0_16px_rgba(0,245,160,0.65)] scale-105'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">credit_card</span>
              <span className="font-label-sm text-label-sm">Cards</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-space-xs transition-all duration-200 ${
                activeTab === 'analytics'
                  ? 'text-primary-container [text-shadow:0_0_16px_rgba(0,245,160,0.65)] scale-105'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">monitoring</span>
              <span className="font-label-sm text-label-sm">Analytics</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-space-xs transition-all duration-200 ${
                activeTab === 'profile'
                  ? 'text-primary-container [text-shadow:0_0_16px_rgba(0,245,160,0.65)] scale-105'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">person</span>
              <span className="font-label-sm text-label-sm">Profile</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
