"use client";

import { useState, useEffect, useRef } from "react";
import { supabase, Prompt, Category } from "@/lib/supabase";
import { Plus, Edit2, Trash2, Image as ImageIcon, LogOut, FolderTree, FileText, Upload, X, Loader2, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"prompts" | "categories">("prompts");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Prompt | Category | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    prompt: "",
    prompt_cn: "",
    negative_prompt: "",
    negative_prompt_cn: "",
    description: "",
    image_url: "",
  });

  // Image upload states
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [catFormData, setCatFormData] = useState({
    id: "",
    name: "",
    icon: "Sparkles",
    description: "",
    parent_id: "",
  });

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, activeTab]);

  // Update preview when image_url changes
  useEffect(() => {
    setPreviewUrl(formData.image_url || null);
  }, [formData.image_url]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("登录失败: " + error.message);
    } else {
      checkUser();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const fetchData = async () => {
    setLoading(true);
    // 始终加载分类数据（添加提示词时需要）
    const { data: cats } = await supabase.from("categories").select("*").order("created_at", { ascending: false });
    setCategories(cats || []);
    
    // 根据当前标签加载对应数据
    if (activeTab === "prompts") {
      const { data } = await supabase.from("prompts").select("*").order("sort_order", { ascending: true });
      setPrompts(data || []);
    }
    setLoading(false);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `prompts/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      setUploadProgress(100);
    } catch (error: any) {
      alert('上传失败: ' + error.message);
      setPreviewUrl(formData.image_url || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image_url: "" });
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmitPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem && "prompt" in editingItem) {
      const { error } = await supabase
        .from("prompts")
        .update(formData)
        .eq("id", editingItem.id);
      if (error) alert("更新失败: " + error.message);
    } else {
      const { error } = await supabase.from("prompts").insert([formData]);
      if (error) alert("创建失败: " + error.message);
    }
    setShowForm(false);
    setEditingItem(null);
    resetForm();
    fetchData();
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    // 将空字符串的 parent_id 转换为 null
    const dataToSave = {
      ...catFormData,
      parent_id: catFormData.parent_id || null,
    };
    if (editingItem && "icon" in editingItem) {
      const { error } = await supabase
        .from("categories")
        .update(dataToSave)
        .eq("id", editingItem.id);
      if (error) alert("更新失败: " + error.message);
    } else {
      const { error } = await supabase.from("categories").insert([dataToSave]);
      if (error) alert("创建失败: " + error.message);
    }
    setShowForm(false);
    setEditingItem(null);
    resetCatForm();
    fetchData();
  };

  const handleDelete = async (id: string, type: "prompt" | "category") => {
    if (!confirm("确定要删除吗？")) return;
    const table = type === "prompt" ? "prompts" : "categories";
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) alert("删除失败: " + error.message);
    fetchData();
  };

  const handleMovePrompt = async (promptId: string, direction: "up" | "down") => {
    // 找到当前提示词和相邻提示词
    const currentIndex = prompts.findIndex(p => p.id === promptId);
    if (currentIndex === -1) return;
    
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= prompts.length) return;
    
    // 确保两个提示词在同一个分类下才交换
    const currentPrompt = prompts[currentIndex];
    const targetPrompt = prompts[targetIndex];
    if (currentPrompt.category_id !== targetPrompt.category_id) return;
    
    // 交换 sort_order
    const currentOrder = currentPrompt.sort_order ?? currentIndex;
    const targetOrder = targetPrompt.sort_order ?? targetIndex;
    
    await supabase.from("prompts").update({ sort_order: targetOrder }).eq("id", promptId);
    await supabase.from("prompts").update({ sort_order: currentOrder }).eq("id", targetPrompt.id);
    
    fetchData();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category_id: "",
      prompt: "",
      prompt_cn: "",
      negative_prompt: "",
      negative_prompt_cn: "",
      description: "",
      image_url: "",
    });
    setPreviewUrl(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetCatForm = () => {
    setCatFormData({
      id: "",
      name: "",
      icon: "Sparkles",
      description: "",
      parent_id: "",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg border border-[#e5e5e5]">
          <h1 className="text-2xl font-medium text-[#171717] mb-6 text-center">管理后台登录</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-[#525252] mb-1">邮箱</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717]"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[#525252] mb-1">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#171717] text-white rounded-md hover:opacity-90 transition-opacity"
            >
              登录
            </button>
          </form>
          <p className="mt-4 text-xs text-[#a3a3a3] text-center">
            需要在 Supabase 控制台创建用户后才能登录
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-medium text-[#171717]">
              37PromptHub
            </Link>
            <span className="text-[#a3a3a3]">/</span>
            <span className="text-[#525252]">管理后台</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#737373]">{user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#525252] border border-[#e5e5e5] rounded-md hover:border-[#171717] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              退出
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("prompts")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "prompts"
                ? "bg-[#171717] text-white"
                : "bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#171717]"
            }`}
          >
            <FileText className="w-4 h-4" />
            提示词管理
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "categories"
                ? "bg-[#171717] text-white"
                : "bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#171717]"
            }`}
          >
            <FolderTree className="w-4 h-4" />
            分类管理
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-[#171717]">
            {activeTab === "prompts" ? "提示词列表" : "分类列表"}
          </h2>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingItem(null);
              resetForm();
              resetCatForm();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#171717] text-white text-sm rounded-md hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            添加{activeTab === "prompts" ? "提示词" : "分类"}
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-medium text-[#171717] mb-4">
                {editingItem ? "编辑" : "添加"}
                {activeTab === "prompts" ? "提示词" : "分类"}
              </h3>
              {activeTab === "prompts" ? (
                <form onSubmit={handleSubmitPrompt} className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#525252] mb-1">标题</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#525252] mb-1">分类</label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717]"
                      required
                    >
                      <option value="">请选择分类</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#525252] mb-1">正向提示词（英文）</label>
                    <textarea
                      value={formData.prompt}
                      onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717] h-24"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#525252] mb-1">正向提示词（中文翻译）</label>
                    <textarea
                      value={formData.prompt_cn}
                      onChange={(e) => setFormData({ ...formData, prompt_cn: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717] h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#525252] mb-1">反向提示词（英文）</label>
                    <textarea
                      value={formData.negative_prompt}
                      onChange={(e) => setFormData({ ...formData, negative_prompt: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717] h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#525252] mb-1">反向提示词（中文翻译）</label>
                    <textarea
                      value={formData.negative_prompt_cn}
                      onChange={(e) => setFormData({ ...formData, negative_prompt_cn: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717] h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#525252] mb-1">描述</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                  
                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm text-[#525252] mb-2">配图</label>
                    <div className="space-y-3">
                      {/* Preview */}
                      {previewUrl && (
                        <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-[#e5e5e5]">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      
                      {/* Upload Button */}
                      <div className="flex items-center gap-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] rounded-md text-sm text-[#525252] hover:border-[#171717] transition-colors disabled:opacity-50"
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              上传中...{uploadProgress}%
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              选择图片
                            </>
                          )}
                        </button>
                        <span className="text-xs text-[#a3a3a3]">支持 JPG、PNG、GIF，最大 5MB</span>
                      </div>
                      
                      {/* Or URL input */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#a3a3a3]">或</span>
                        <input
                          type="text"
                          value={formData.image_url}
                          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                          className="flex-1 px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717] text-sm"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 py-2 bg-[#171717] text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      保存
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 py-2 border border-[#e5e5e5] text-[#525252] rounded-md hover:border-[#171717] transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmitCategory} className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#525252] mb-1">分类ID（英文，如：quality）</label>
                    <input
                      type="text"
                      value={catFormData.id}
                      onChange={(e) => setCatFormData({ ...catFormData, id: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717]"
                      required
                      disabled={!!editingItem}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#525252] mb-1">分类名称</label>
                    <input
                      type="text"
                      value={catFormData.name}
                      onChange={(e) => setCatFormData({ ...catFormData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#525252] mb-1">图标</label>
                    <select
                      value={catFormData.icon}
                      onChange={(e) => setCatFormData({ ...catFormData, icon: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717]"
                    >
                      <option value="Sparkles">Sparkles</option>
                      <option value="Ban">Ban</option>
                      <option value="Palette">Palette</option>
                      <option value="User">User</option>
                      <option value="Sun">Sun</option>
                      <option value="Shirt">Shirt</option>
                      <option value="Activity">Activity</option>
                      <option value="Smile">Smile</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#525252] mb-1">描述</label>
                    <input
                      type="text"
                      value={catFormData.description}
                      onChange={(e) => setCatFormData({ ...catFormData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#525252] mb-1">父分类（可选）</label>
                    <select
                      value={catFormData.parent_id}
                      onChange={(e) => setCatFormData({ ...catFormData, parent_id: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#171717]"
                    >
                      <option value="">无（主分类）</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-[#171717] text-white rounded-md hover:opacity-90 transition-opacity"
                    >
                      保存
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 py-2 border border-[#e5e5e5] text-[#525252] rounded-md hover:border-[#171717] transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="text-center py-12 text-[#737373]">加载中...</div>
        ) : activeTab === "prompts" ? (
          <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#f5f5f5]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#525252]">标题</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#525252]">分类</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#525252]">图片</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[#525252]">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5e5]">
                {prompts.map((prompt) => (
                  <tr key={prompt.id} className="hover:bg-[#fafafa]">
                    <td className="px-4 py-3 text-sm text-[#171717]">{prompt.title}</td>
                    <td className="px-4 py-3 text-sm text-[#737373]">
                      {categories.find((c) => c.id === prompt.category_id)?.name || prompt.category_id}
                    </td>
                    <td className="px-4 py-3">
                      {prompt.image_url ? (
                        <div className="w-10 h-10 rounded overflow-hidden">
                          <img src={prompt.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <span className="text-sm text-[#a3a3a3]">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleMovePrompt(prompt.id, "up")}
                          className="p-1.5 text-[#a3a3a3] hover:text-[#171717] transition-colors"
                          title="上移"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMovePrompt(prompt.id, "down")}
                          className="p-1.5 text-[#a3a3a3] hover:text-[#171717] transition-colors"
                          title="下移"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingItem(prompt);
                            setFormData({
                              title: prompt.title,
                              category_id: prompt.category_id,
                              prompt: prompt.prompt,
                              prompt_cn: prompt.prompt_cn || "",
                              negative_prompt: prompt.negative_prompt || "",
                              negative_prompt_cn: prompt.negative_prompt_cn || "",
                              description: prompt.description || "",
                              image_url: prompt.image_url || "",
                            });
                            setPreviewUrl(prompt.image_url || null);
                            setShowForm(true);
                          }}
                          className="p-1.5 text-[#525252] hover:text-[#171717] transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(prompt.id, "prompt")}
                          className="p-1.5 text-[#525252] hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#f5f5f5]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#525252]">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#525252]">名称</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#525252]">父分类</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[#525252]">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5e5]">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#fafafa]">
                    <td className="px-4 py-3 text-sm text-[#737373]">{cat.id}</td>
                    <td className="px-4 py-3 text-sm text-[#171717]">{cat.name}</td>
                    <td className="px-4 py-3 text-sm text-[#737373]">
                      {cat.parent_id ? categories.find((c) => c.id === cat.parent_id)?.name || cat.parent_id : "-"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingItem(cat);
                            setCatFormData({
                              id: cat.id,
                              name: cat.name,
                              icon: cat.icon,
                              description: cat.description || "",
                              parent_id: cat.parent_id || "",
                            });
                            setShowForm(true);
                          }}
                          className="p-1.5 text-[#525252] hover:text-[#171717] transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, "category")}
                          className="p-1.5 text-[#525252] hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
