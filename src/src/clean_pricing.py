import sys
import re

with open('e:/Projetos-Antigrav/agente-funil/sendzap-landing/src/components/PricingPagarme.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove setPixQrCodeUrl and setPixCopiaECola
content = content.replace("setPixQrCodeUrl('');", "")
content = content.replace("setPixCopiaECola('');", "")

# Remove import GooglePayButton
content = re.sub(r"import GooglePayButton from '@google-pay/button-react';\n?", "", content)

# Remove googlePaymentRequest block
# It starts with '  const googlePaymentRequest = {' and ends with '  };' a few lines later.
google_req_start = content.find("  const googlePaymentRequest = {")
if google_req_start != -1:
    google_req_end = content.find("  };", google_req_start)
    if google_req_end != -1:
        content = content[:google_req_start] + content[google_req_end + 4:]

# Remove the Pix QR Code rendering block
# Starts with '{pixQrCodeUrl ? (' and ends before '{!checkoutSuccess && !pixQrCodeUrl ? ('
pix_render_start = content.find("{pixQrCodeUrl ? (")
if pix_render_start != -1:
    # Find the matching closing bracket or the next condition '{!checkoutSuccess && !pixQrCodeUrl ? ('
    next_cond = content.find("{!checkoutSuccess && !pixQrCodeUrl ? (", pix_render_start)
    if next_cond != -1:
        content = content[:pix_render_start] + content[next_cond:]
        
        # Also change '{!checkoutSuccess && !pixQrCodeUrl ? (' to '{!checkoutSuccess ? ('
        content = content.replace("{!checkoutSuccess && !pixQrCodeUrl ? (", "{!checkoutSuccess ? (")

with open('e:/Projetos-Antigrav/agente-funil/sendzap-landing/src/components/PricingPagarme.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
