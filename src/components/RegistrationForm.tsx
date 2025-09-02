
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {dictionaryWithLabel, Dictionary, initRegistrationFormData, RegistrationFormData} from "@/types/api";
import { dictionaryService } from "@/services/dictionary-service";
import { registrationService } from "@/services/registration-service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/contexts/LanguageContext";
import PhoneMaskedInput from "@/components/ui/PhoneMaskedInput.tsx";

interface RegistrationFormProps {
  mode?: "create" | "edit";
  registrationId?: number;
}

export function RegistrationForm({ mode = "create", registrationId }: RegistrationFormProps) {
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation();
  const [formData, setFormData] = useState<RegistrationFormData>(initRegistrationFormData);
  const [dictionaries, setDictionaries] = useState<{
    nationalities: Dictionary[];
    genders: Dictionary[];
    educations: Dictionary[];
    socialStatuses: Dictionary[];
    specializations: Dictionary[];
    institutes: Dictionary[];
    faculties: Dictionary[];
    academicDegrees: Dictionary[];
  }>({
    nationalities: [],
    genders: [],
    educations: [],
    socialStatuses: [],
    specializations: [],
    institutes: [],
    faculties: [],
    academicDegrees: [],
  });

  useEffect(() => {
    const loadDictionaries = async () => {
      try {
        const [
          nationalitiesRes,
          gendersRes,
          educationsRes,
          socialStatusesRes,
          specializationsRes,
          institutesRes,
          facultiesRes,
          academicDegreesRes,
        ] = await Promise.all([
            dictionaryService.getNationalities(),
          dictionaryService.getGenders(),
          dictionaryService.getEducations(),
          dictionaryService.getSocialStatuses(),
          dictionaryService.getSpecializations(),
          dictionaryService.getInstitutes(),
          dictionaryService.getFaculties(),
          dictionaryService.getAcademicDegrees(),
        ]);

        setDictionaries({
          nationalities: nationalitiesRes.data,
          genders: gendersRes.data,
          educations: educationsRes.data,
          socialStatuses: socialStatusesRes.data,
          specializations: specializationsRes.data,
          institutes: institutesRes.data,
          faculties: facultiesRes.data,
          academicDegrees: academicDegreesRes.data,
        });
      } catch (error) {
        toast.error(t('loadError'));
      }
    };

    loadDictionaries();
  }, [t]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await registrationService.submit(formData);
        toast.success(t('submissionSuccess'));
        if (res.data.status === "pending") {
            alert(t('submissionSuccess'))
        } else if (res.data.status === "reregistration") {
            alert(t('renewalReaderRegistration')+'\n'+t('ticket')+' №'+res.data.ticketNumber)
        }
        setFormData(initRegistrationFormData);

    } catch (error) {
        alert(t('processingError')+'\n'+error.response?.data.error.message)
    }
  };
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{t('registration')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
            <Label htmlFor="photo">{t('photo')}</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="iin" required={true} requiredLabel={'*'}>{t('iin')}</Label>
              <Input
                id="iin"
                value={formData.iin}
                onChange={(e) => setFormData({ ...formData, iin: e.target.value })}
                required
                maxLength={12}
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" required={true} requiredLabel={'*'}>{t('lastName')}</Label>
              <Input
                id="lastName"
                value={formData.lastname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                required
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName" required={true} requiredLabel={'*'}>{t('firstName')}</Label>
              <Input
                id="firstName"
                value={formData.firstname}
                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                required
                className="transition-all duration-200"
              />
            </div>

              <div className="space-y-2">
                  <Label htmlFor="firstName">{t('middleName')}</Label>
                  <Input
                      id="middleName"
                      value={formData.middlename}
                      onChange={(e) => setFormData({ ...formData, middlename: e.target.value })}
                      className="transition-all duration-200"
                  />
              </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate" required={true} requiredLabel={'*'}>{t('birthDate')}</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                required
                className="transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
            <Label htmlFor="nationality" required={true} requiredLabel={'*'}>{t('nationality')}</Label>
              <Select
                  value={formData.nationality.toString()}
                  onValueChange={(value) => setFormData({ ...formData, nationality: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('nationality')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.nationalities.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" required={true} requiredLabel={'*'}>{t('gender')}</Label>
              <Select
                value={formData.sex.toString()}
                onValueChange={(value) => setFormData({ ...formData, sex: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('gender')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.genders.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                        {dictionaryWithLabel(item).label(currentLanguage)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education" required={true} requiredLabel={'*'}>{t('education')}</Label>
              <Select
                value={formData.education.toString()}
                onValueChange={(value) => setFormData({ ...formData, education: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('education')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.educations.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                        {dictionaryWithLabel(item).label(currentLanguage)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialStatus" required={true} requiredLabel={'*'}>{t('socialStatus')}</Label>
              <Select
                value={formData.socialStatus.toString()}
                onValueChange={(value) => setFormData({ ...formData, socialStatus: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('socialStatus')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.socialStatuses.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">{t('specialization')}</Label>
              <Select
                value={formData.speciality.toString()}
                onValueChange={(value) => setFormData({ ...formData, speciality: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('specialization')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.specializations.map((item) => {
                      if (item.name !== "") {
                          return <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name}
                          </SelectItem>
                      }
                    }
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="institute">{t('institute')}</Label>
              <Select
                value={formData.institution.toString()}
                onValueChange={(value) => setFormData({ ...formData, institution: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('institute')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.institutes.map((item) => {
                      if(item.name!=="") {
                          return <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name}
                          </SelectItem>
                      }
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty">{t('faculty')}</Label>
              <Select
                value={formData.faculty.toString()}
                onValueChange={(value) => setFormData({ ...formData, faculty: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('faculty')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.faculties.map((item) => {
                      if(item.name!=="") {
                          return <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name}
                          </SelectItem>
                      }
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">{t('course')}</Label>
              <Input
                id="course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workplace">{t('workplace')}</Label>
              <Input
                id="workplace"
                value={formData.workPlace}
                onChange={(e) => setFormData({ ...formData, workPlace: e.target.value })}
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">{t('position')}</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="academicDegree">{t('academicDegree')}</Label>
              <Select
                value={formData.academicDegree.toString()}
                onValueChange={(value) => setFormData({ ...formData, academicDegree: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('academicDegree')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.academicDegrees.map((item) => {
                      if(item.name!=="") {
                          return <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name}
                          </SelectItem>
                      }
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" required={true} requiredLabel={'*'}>{t('phoneNumber')}</Label>
              <PhoneMaskedInput
                    id="phoneNumber"
                    value={formData.phone || ""}                // ВАЖНО: дефолт в ""
                    onValueChange={(masked) => setFormData({ ...formData, phone: masked })}
                    required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workPhone" required={true} requiredLabel={'*'}>{t('workPhone')}</Label>
                <PhoneMaskedInput
                    id="workPhone"
                    value={formData.workPhone || ""}                // ВАЖНО: дефолт в ""
                    onValueChange={(masked) => setFormData({ ...formData, workPhone: masked })}
                    required
                />

            </div>

            <div className="space-y-2">
              <Label htmlFor="email" required={true} requiredLabel={'*'}>{t('email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" required={true} requiredLabel={'*'}>{t('address')}</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {t('submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
