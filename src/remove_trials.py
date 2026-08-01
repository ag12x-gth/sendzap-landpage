import os

files_to_update = {
    'e:/Projetos-Antigrav/agente-funil/sendzap-landing/src/components/PricingPagarme.tsx': [
        ('"7 dias de teste sem risco"', '"Pagamento 100% seguro"'),
        ('Todos os planos incluem 7 dias de teste grátis sem compromisso.', 'Pagamento 100% seguro e transparente.')
    ],
    'e:/Projetos-Antigrav/agente-funil/sendzap-landing/src/components/Navbar.tsx': [
        ('Teste por 7 dias Grátis ⚡', 'Ver Planos ⚡'),
        ('Teste por 7 dias Grátis', 'Ver Planos')
    ],
    'e:/Projetos-Antigrav/agente-funil/sendzap-landing/src/components/Hero.tsx': [
        ('Teste por 7 dias Grátis', 'Ver Planos Disponíveis')
    ],
    'e:/Projetos-Antigrav/agente-funil/sendzap-landing/src/components/FAQSection.tsx': [
        ('antes de iniciar seus 7 dias grátis', 'antes de iniciar sua assinatura')
    ],
    'e:/Projetos-Antigrav/agente-funil/sendzap-landing/src/components/BottomCTA.tsx': [
        ('Experimente a inteligência Sendzap por 7 dias grátis', 'Assine a inteligência Sendzap'),
        ('Testar por 7 dias Grátis', 'Ver Planos Disponíveis')
    ]
}

for file_path, replacements in files_to_update.items():
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        for old_str, new_str in replacements:
            content = content.replace(old_str, new_str)
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
print("Text replacements completed.")
