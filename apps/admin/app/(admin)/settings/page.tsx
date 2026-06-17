"use client";

import { useState } from "react";
import { Save, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);
  const [maintenanceConfirm, setMaintenanceConfirm] = useState("");

  // Institute Info
  const [instituteName, setInstituteName] = useState("Shiksha Classes");
  const [tagline, setTagline] = useState("Premier JEE, NEET & MHT-CET Coaching in Bhandara");
  const [address, setAddress] = useState("Main Road, Bhandara");
  const [phone, setPhone] = useState("+91 XXXXX XXXXX");
  const [email, setEmail] = useState("enquiry@shikshaclasses.in");
  const [whatsapp, setWhatsapp] = useState("+91 XXXXX XXXXX");
  const [mapsUrl, setMapsUrl] = useState("https://www.google.com/maps/embed?pb=...");

  // Social
  const [facebook, setFacebook] = useState("https://facebook.com/shikshaclassesbhandara");
  const [instagram, setInstagram] = useState("https://instagram.com/shikshaclasses");
  const [youtube, setYoutube] = useState("");
  const [twitter, setTwitter] = useState("");

  // SEO
  const [metaTitleSuffix, setMetaTitleSuffix] = useState("Shiksha Classes Bhandara");
  const [metaDescription, setMetaDescription] = useState("Premier coaching for JEE, NEET, MHT-CET in Bhandara. Expert faculty, proven results.");
  const [googleVerification, setGoogleVerification] = useState("");

  // Analytics
  const [gaId, setGaId] = useState("");
  const [gtmId, setGtmId] = useState("");
  const [pixelId, setPixelId] = useState("");

  // Feature Flags
  const [showBanner, setShowBanner] = useState(true);
  const [blogEnabled, setBlogEnabled] = useState(true);
  const [galleryEnabled, setGalleryEnabled] = useState(true);
  const [careersEnabled, setCareersEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Legal
  const [privacyUrl, setPrivacyUrl] = useState("");
  const [termsUrl, setTermsUrl] = useState("");
  const [copyrightYear, setCopyrightYear] = useState("2026");

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    toast.success("Settings saved successfully!");
  };

  const FormRow = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {hint && <p className="text-xs text-[#555D67]">{hint}</p>}
    </div>
  );

  const SaveButton = () => (
    <Button onClick={handleSave} disabled={saving} className="bg-[#1E6FA8] hover:bg-[#2A8FD4] text-white mt-4">
      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      Save Changes
    </Button>
  );

  const SectionCard = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl border border-[#2C333C] bg-[#1C2025] p-6 space-y-5">
      {children}
    </div>
  );

  return (
    <div className="space-y-4 max-w-3xl">
      <Tabs defaultValue="institute">
        <TabsList className="flex-wrap h-auto gap-1 bg-[#222830] p-1 mb-6">
          {["institute", "social", "seo", "analytics", "flags", "legal"].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="capitalize text-xs">
              {tab === "flags" ? "Feature Flags" : tab === "seo" ? "SEO" : tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ─── Institute Info ─── */}
        <TabsContent value="institute">
          <SectionCard>
            <FormRow label="Institute Name">
              <Input value={instituteName} onChange={(e) => setInstituteName(e.target.value)} />
            </FormRow>
            <FormRow label="Tagline">
              <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </FormRow>
            <FormRow label="Address">
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </FormRow>
            <div className="grid grid-cols-2 gap-4">
              <FormRow label="Primary Phone">
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </FormRow>
              <FormRow label="WhatsApp Number">
                <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
              </FormRow>
            </div>
            <FormRow label="Enquiry Email">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormRow>
            <FormRow label="Google Maps Embed URL" hint="Paste the full embed URL from Google Maps → Share → Embed a map">
              <Textarea value={mapsUrl} onChange={(e) => setMapsUrl(e.target.value)} className="h-20 font-mono text-xs resize-none" />
            </FormRow>
            <SaveButton />
          </SectionCard>
        </TabsContent>

        {/* ─── Social Media ─── */}
        <TabsContent value="social">
          <SectionCard>
            {[
              { label: "Facebook URL", value: facebook, set: setFacebook },
              { label: "Instagram URL", value: instagram, set: setInstagram },
              { label: "YouTube Channel URL", value: youtube, set: setYoutube },
              { label: "Twitter / X URL", value: twitter, set: setTwitter },
            ].map(({ label, value, set }) => (
              <FormRow key={label} label={label}>
                <Input placeholder="https://..." value={value} onChange={(e) => set(e.target.value)} />
              </FormRow>
            ))}
            <SaveButton />
          </SectionCard>
        </TabsContent>

        {/* ─── SEO ─── */}
        <TabsContent value="seo">
          <SectionCard>
            <FormRow label="Meta Title Suffix" hint={`Preview: "JEE Coaching Bhandara | ${metaTitleSuffix}"`}>
              <Input value={metaTitleSuffix} onChange={(e) => setMetaTitleSuffix(e.target.value)} />
            </FormRow>
            <FormRow label={`Default Meta Description ${metaDescription.length}/160`}>
              <Textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                maxLength={160}
                className="h-20 resize-none"
              />
              <div className="w-full bg-[#222830] h-1 rounded-full mt-1">
                <div
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: `${(metaDescription.length / 160) * 100}%`,
                    background: metaDescription.length > 140 ? "#B04040" : "#3D8E6B"
                  }}
                />
              </div>
            </FormRow>
            <FormRow label="Google Site Verification Token">
              <Input
                value={googleVerification}
                onChange={(e) => setGoogleVerification(e.target.value)}
                placeholder="google-site-verification=..."
                className="font-mono text-sm"
              />
            </FormRow>
            <SaveButton />
          </SectionCard>
        </TabsContent>

        {/* ─── Analytics ─── */}
        <TabsContent value="analytics">
          <SectionCard>
            <FormRow label="Google Analytics ID" hint="Format: G-XXXXXXXXXX">
              <Input value={gaId} onChange={(e) => setGaId(e.target.value)} placeholder="G-XXXXXXXXXX" className="font-mono" />
            </FormRow>
            <FormRow label="Google Tag Manager ID" hint="Format: GTM-XXXXXXX">
              <Input value={gtmId} onChange={(e) => setGtmId(e.target.value)} placeholder="GTM-XXXXXXX" className="font-mono" />
            </FormRow>
            <FormRow label="Facebook Pixel ID">
              <Input value={pixelId} onChange={(e) => setPixelId(e.target.value)} placeholder="XXXXXXXXXXXXXXXX" className="font-mono" />
            </FormRow>
            <SaveButton />
          </SectionCard>
        </TabsContent>

        {/* ─── Feature Flags ─── */}
        <TabsContent value="flags">
          <SectionCard>
            <p className="text-xs text-[#555D67] mb-2">Toggle site-wide features. Changes go live immediately.</p>
            {[
              { label: "Announcement Banner", desc: "Show the top banner on the public site", value: showBanner, set: setShowBanner },
              { label: "Blog Section", desc: "Show the blog on the public site", value: blogEnabled, set: setBlogEnabled },
              { label: "Gallery Page", desc: "Show the gallery on the public site", value: galleryEnabled, set: setGalleryEnabled },
              { label: "Careers Page", desc: "Show job openings on the public site", value: careersEnabled, set: setCareersEnabled },
            ].map(({ label, desc, value, set }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-[#2C333C]">
                <div>
                  <p className="text-sm font-medium text-[#ECEDEE]">{label}</p>
                  <p className="text-xs text-[#555D67]">{desc}</p>
                </div>
                <Switch checked={value} onCheckedChange={set} />
              </div>
            ))}

            {/* Maintenance Mode — dangerous */}
            <div className="flex items-center justify-between py-3 rounded-lg border border-red-500/20 bg-red-500/5 px-4 mt-3">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <p className="text-sm font-medium text-red-300">Maintenance Mode</p>
                </div>
                <p className="text-xs text-red-400/70 mt-0.5">Makes the entire public website inaccessible</p>
              </div>
              <Switch
                checked={maintenanceMode}
                onCheckedChange={(v) => v ? setMaintenanceOpen(true) : setMaintenanceMode(false)}
                className={maintenanceMode ? "data-[state=checked]:bg-red-600" : ""}
              />
            </div>
            <SaveButton />
          </SectionCard>
        </TabsContent>

        {/* ─── Legal ─── */}
        <TabsContent value="legal">
          <SectionCard>
            <FormRow label="Privacy Policy URL">
              <Input value={privacyUrl} onChange={(e) => setPrivacyUrl(e.target.value)} placeholder="https://..." />
            </FormRow>
            <FormRow label="Terms of Use URL">
              <Input value={termsUrl} onChange={(e) => setTermsUrl(e.target.value)} placeholder="https://..." />
            </FormRow>
            <FormRow label="Copyright Year">
              <Input value={copyrightYear} onChange={(e) => setCopyrightYear(e.target.value)} className="max-w-[120px] font-mono" maxLength={4} />
            </FormRow>
            <SaveButton />
          </SectionCard>
        </TabsContent>
      </Tabs>

      {/* Maintenance Mode Confirmation */}
      <Dialog open={maintenanceOpen} onOpenChange={setMaintenanceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-300">
              <AlertTriangle className="h-5 w-5" />
              Enable Maintenance Mode
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-[#8B919A]">
            This will make the entire public website inaccessible to visitors. Type <strong className="text-red-400">CONFIRM</strong> to proceed.
          </DialogDescription>
          <Input
            value={maintenanceConfirm}
            onChange={(e) => setMaintenanceConfirm(e.target.value)}
            placeholder="Type CONFIRM to enable"
            className="border-red-500/30 font-mono"
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => { setMaintenanceOpen(false); setMaintenanceConfirm(""); }}>Cancel</Button>
            <Button
              disabled={maintenanceConfirm !== "CONFIRM"}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-30"
              onClick={() => {
                setMaintenanceMode(true);
                setMaintenanceOpen(false);
                setMaintenanceConfirm("");
                toast.warning("Maintenance mode enabled. Public site is now offline.");
              }}
            >
              Enable Maintenance Mode
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
