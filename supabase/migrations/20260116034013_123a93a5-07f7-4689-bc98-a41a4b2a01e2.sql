-- Add policy for property owners to view inquiries about their properties
CREATE POLICY "Property owners can view inquiries for their properties"
ON public.inquiries
FOR SELECT
USING (
  auth.uid() = user_id 
  OR 
  EXISTS (
    SELECT 1 FROM public.property_listings pl 
    WHERE pl.id::text = inquiries.property_id 
    AND pl.user_id = auth.uid()
  )
);

-- Drop the old restrictive policy and replace with the combined one
DROP POLICY IF EXISTS "Users can view their own inquiries" ON public.inquiries;